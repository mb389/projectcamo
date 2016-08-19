import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateColumn} from 'actions/sheet';
import { fetchFormulaStore } from 'actions/formulaStore'
import { formulaUpload, formulaRemove } from 'actions/formulaStore';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';
import OtherMenuItem from './OtherMenuItem';
import FormulaMenuItem from './FormulaMenuItem';
import SelectMenuItem from './SelectMenuItem';

const cx = classNames.bind(styles);

function glyphFromType (type) {
	switch (type) {
		case 'Text':
			return 'font';
		case 'Number':
			return 'plus';
		case 'Checkbox':
			return 'check';
		case 'Reference':
			return 'retweet';
		case 'ID':
			return 'cog';
		case 'Formula':
			return 'console';
		case 'Images':
			return 'camera';
		case 'Link':
			return 'link';
		case 'Select':
			return 'menu-hamburger';
		case 'Address':
			return 'map-marker';
		default:
			return 'cog';
	}
}

class MenuEditCol extends Component {
	constructor(props,state){
		super(props, state);

		this.state = {type: (this.props.data.type || 'Text'), name: this.props.data.name, formula: this.props.data.formula, formulaName: this.props.data.formulaName || 'Unnamed', linkedSheet: this.props.data.linkedSheet, width: this.props.data.width, selectOptions: this.props.data.selectOptions};


		this.saveTypeChanges = this.saveTypeChanges.bind(this);
		this.itemSelected = this.itemSelected.bind(this);
		this.handleFormulaCustom = this.handleFormulaCustom.bind(this);
		this.handleEditName = this.handleEditName.bind(this);
		this.exitTypeMenu = this.exitTypeMenu.bind(this);
		this.formulaUpload = this.formulaUpload.bind(this);
		this.formulaRemove = this.formulaRemove.bind(this);
		this.handleFormulaNameChange = this.handleFormulaNameChange.bind(this);
		this.addSelectOption = this.addSelectOption.bind(this);
		this.editSelectOption = this.editSelectOption.bind(this);
		this.removeSelectOption = this.removeSelectOption.bind(this);
	}

	componentWillMount(){
		// TODO if this is already on the store don't load it again?
		this.props.dispatch(fetchFormulaStore());
	}

	addSelectOption(){
		this.setState({selectOptions: this.state.selectOptions.concat([""])});
	}

	editSelectOption(idx, evt){
		let opts = this.state.selectOptions;
		opts[idx]=evt.target.value;
		this.setState({selectOptions: opts})
	}

	removeSelectOption(idx, evt){
		let opts = this.state.selectOptions;
		opts.splice(idx, 1);
		this.setState({selectOptions: opts})
	}

	itemSelected(e, ekey) {
		if (ekey === "Select" && !this.state.selectOptions) this.setState({selectOptions: []})
		this.setState({type: ekey});
	}

	handleEditName(e){
		this.setState({name: e.target.value});
	}

	handleFormulaCustom(e, ekey) {
		if (ekey) this.setState({formula: ekey});
		else this.setState({formula: e});
	}

	handleFormulaNameChange(e) {
		this.setState({formulaName: e.target.value||e.target.innerHTML});
	}

	formulaUpload() {
		this.props.dispatch(formulaUpload(this.state.formulaName, this.state.formula));
	}

	formulaRemove(id) {
		this.props.dispatch(formulaRemove(id));
		this.setState({formulaName: "Empty", formula: "Write your formula here"});
	}

	saveTypeChanges() {
		let newColData = Object.assign({}, this.state);
		newColData.id = this.props.data.id;
		newColData.idx = this.props.data.idx;
		// TODO should do a deep equals
		if (newColData == this.props.data) console.log('No Change');
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
					formulaRemove={this.formulaRemove}
					formulas={this.props.formulas}
				/>
				),
			'Images': (<OtherMenuItem description='Upload custom images.' />),
			'Checkbox': (<OtherMenuItem description='Create checkboxes' />),
			'Select': (
				<SelectMenuItem
					selectOptions={this.state.selectOptions}
					addSelectOption={this.addSelectOption}
					editSelectOption={this.editSelectOption}
					removeSelectOption={this.removeSelectOption}
				/>
				),
			'Link': (<OtherMenuItem description='Create a link to an external site ' />),
			'Reference': (<OtherMenuItem description='Link to another sheet'/>)
		}

		function generateTypes () {
			let MenuItems = [];
			for (let fieldType in columnTypes) {
				MenuItems.push(<MenuItem key={MenuItems.length} eventKey={fieldType}>
									<Glyphicon className={cx('columnTypeMenuItem')} glyph={glyphFromType(fieldType)}/> {fieldType}
								</MenuItem>);
			}
			return MenuItems;
		}

		return (
				<div className={cx('editNameAndType')} style={{width: this.state.type==="Formula"?300:250}} >
					<ContentEditable className={cx('thead') + ' col-xs-12'} onChange={this.handleEditName} html={this.state.name} />
					<Dropdown id="dropdown-custom-1" onSelect={this.itemSelected} className={cx('typeDropdown') + ' col-xs-12'}>
				      <Dropdown.Toggle noCaret className=' col-xs-12'>
				        <Glyphicon className={cx('columnType')} glyph={glyphFromType(this.state.type)}/>
				        {this.state.type}
				        <Glyphicon className={cx('columnCarrat')} glyph="menu-down" />
				      </Dropdown.Toggle>
				      <Dropdown.Menu className={cx('columnMenu')}>
				      	{generateTypes()}
				      </Dropdown.Menu>
				    </Dropdown>


				    {columnTypes[this.state.type]}
				    <div className='col-xs-12'>
					    <button className="btn col-xs-5" type="button" onClick={this.exitTypeMenu}>Cancel</button>
					    <button className="btn btn-primary col-xs-5" type="button" onClick={this.saveTypeChanges}>Save</button>
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
