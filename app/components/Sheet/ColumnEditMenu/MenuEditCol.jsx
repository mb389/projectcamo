import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateColumn} from 'actions/sheet';
import { fetchFormulaStore } from 'actions/formulaStore';
// TODO maybe load this earlier to avoid delay
import { formulaUpload } from 'actions/formulaStore';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';
import OtherMenuItem from './OtherMenuItem';
import FormulaMenuItem from './FormulaMenuItem';

const cx = classNames.bind(styles);


class MenuEditCol extends Component {
	constructor(props,state){
		super(props, state);
		this.state = {type: (this.props.data.type || 'Text'), name: this.props.data.name, formula: this.props.data.formula, formulaName: this.props.data.formulaName || 'Unnamed', linkedSheet: this.props.data.linkedSheet};

		this.saveTypeChanges = this.saveTypeChanges.bind(this);
		this.itemSelected = this.itemSelected.bind(this);
		this.handleFormulaCustom = this.handleFormulaCustom.bind(this);
		this.handleEditName = this.handleEditName.bind(this);
		this.exitTypeMenu = this.exitTypeMenu.bind(this);
		this.formulaUpload = this.formulaUpload.bind(this);
		this.handleFormulaNameChange = this.handleFormulaNameChange.bind(this);
	}

	componentWillMount(){
		// TODO if this is already on the store don't load it again?
		this.props.dispatch(fetchFormulaStore());
	}

	itemSelected(e, ekey) {
		this.setState({type: ekey});
	}

	handleEditName(e){
		this.setState({name: e.target.value});
	}

	handleFormulaCustom(e, ekey) {
		if (ekey) this.setState({formula: ekey});
		else this.setState({formula: e.target.value});
	}

	handleFormulaNameChange(e) {
		this.setState({formulaName: e.target.value||e.target.innerHTML});
	}

	formulaUpload() {
		this.props.dispatch(formulaUpload(this.state.formulaName, this.state.formula));
	}

	saveTypeChanges() {
		let newColData = Object.assign({}, this.state);
		newColData.id = this.props.data.id;
		newColData.idx = this.props.data.idx;
		// TODO should do a deep equals
		if (newColData == this.props.data) {}
		else this.props.dispatch(updateColumn(newColData))

		this.props.exitTypeMenu();
	}

	exitTypeMenu() {
		if(!this.props.data.type) this.saveTypeChanges();
		this.props.exitTypeMenu();
	}

	render () {
		let columnTypes = {
			'Text': (<OtherMenuItem description='A single line of text.' />),
			'Number': (<OtherMenuItem description='A number field.' />),
			'Formula': (
				<FormulaMenuItem
					handleFormulaNameChange={this.handleFormulaNameChange}
					formulaName={this.state.formulaName}
					handleFormulaCustom={this.handleFormulaCustom}
					formula={this.state.formula}
					formulaUpload={this.formulaUpload}
					formulas={this.props.formulas}
				/>
				), 
			'Images': (<OtherMenuItem description='Upload custom images.' />),
			'Checkbox': (<OtherMenuItem description='Create checkboxes' />),
			'Select': (<OtherMenuItem description='Select a single predefined option from a dropdown' />),
			'Link': (<OtherMenuItem description='Create a link to an external site ' />),
			'Reference': (<OtherMenuItem description='Link to another sheet'/>)
		}

		function generateTypes () {
			var MenuItems = [];
			for (let fieldType in columnTypes) {
				MenuItems.push(<MenuItem key={MenuItems.length} eventKey={fieldType}>{fieldType}</MenuItem>);
			}
			return MenuItems;
		}

		return (
				<div className={cx('editNameAndType')}>
					<ContentEditable className={cx('thead') + ' col-md-12'} onChange={this.handleEditName} html={this.state.name} />
					<Dropdown id="dropdown-custom-1" onSelect={this.itemSelected} className={cx('typeDropdown') + ' col-md-12'}>
				      <Dropdown.Toggle noCaret className=' col-md-12'>
				        {this.state.type} <Glyphicon className={cx('columnCarrat')} glyph="menu-down" />
				      </Dropdown.Toggle>
				      <Dropdown.Menu className={cx('columnMenu')}>
				      	{generateTypes()}
				      </Dropdown.Menu>
				    </Dropdown>

				    
				    {columnTypes[this.state.type]}
				    <div className='col-md-12'>
					    <button className="btn col-md-5" type="button" onClick={this.exitTypeMenu}>Cancel</button>
					    <button className="btn btn-primary col-md-5" type="button" onClick={this.saveTypeChanges}>Save</button>
					</div>
				</div>
				)
	}
}

// get formulaStore from state and map it to proms if the form is already loaded then don't fetch?

function mapStateToProps(store) {
  return {
    formulas: store.formulaStore.formulas,
  };
}

export default connect(mapStateToProps)(MenuEditCol);