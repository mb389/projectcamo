import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateColumn, formulaUpload } from 'actions/sheet';
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
		this.state = {colType: (this.props.data.type || 'Text'), colName: this.props.data.name, formula: this.props.data.formula, formulaName: 'DefaultName'};

		this.saveTypeChanges = this.saveTypeChanges.bind(this);
		this.itemSelected = this.itemSelected.bind(this);
		this.handleFormulaCustom = this.handleFormulaCustom.bind(this);
		this.handleEditName = this.handleEditName.bind(this);
		this.exitTypeMenu = this.exitTypeMenu.bind(this);
		this.formulaUpload = this.formulaUpload.bind(this);
		this.handleFormulaNameChange = this.handleFormulaNameChange.bind(this);
	}

	itemSelected(e, ekey) {
		this.setState({colType: ekey});
	}

	handleEditName(e){
		this.setState({colName: e.target.value});
	}

	handleFormulaCustom(e) {	
		this.setState({formula: e.target.value});
	}

	handleFormulaNameChange(e) {
		this.setState({formulaName: e.target.value});
	}

	formulaUpload() {
		this.props.dispatch(formulaUpload(this.state.formulaName, this.state.formula));
	}

	saveTypeChanges() {
		let newColData = {
			id: this.props.data.id,
			type: this.state.colType,
			name: this.state.colName,
			idx: this.props.data.idx,
		}

		if(this.state.formula) newColData.formula = this.state.formula;

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
			'Number': (<OtherMenuItem description='A number feild.' />),
			'Formula': (
				<FormulaMenuItem
					handleFormulaNameChange={this.handleFormulaNameChange}
					formulaName={this.state.formulaName}
					handleFormulaCustom={this.handleFormulaCustom}
					formula={this.state.formula}
					formulaUpload={this.formulaUpload}
				/>
				), 
			'Images': (
				<div className='col-md-12'>
					<p className='col-md-12'> Upload custom images </p>
				</div>
				), 
			'Checkbox': (
				<div className='col-md-12'>
					<p className='col-md-12'> Creates checkboxes </p>
				</div>
				), 
			'Select': (
				<div className='col-md-12'>
					<p className='col-md-12'> Select a single predefined option from a dropdown </p>
				</div>
				), 
			'Link': (
				<div className='col-md-12'>
					<p className='col-md-12'> Create a link to an external site </p>
				</div>
				), 
		}

		function generateTypes () {
			var MenuItems = [];
			for (let feildType in columnTypes) {
				MenuItems.push(<MenuItem key={MenuItems.length} eventKey={feildType}>{feildType}</MenuItem>);
			}
			return MenuItems;
			}

		return (
				<div className={cx('editNameAndType')}>
					<ContentEditable className={cx('thead') + ' col-md-12'} onChange={this.handleEditName} html={this.state.colName} />
					<Dropdown id="dropdown-custom-1" onSelect={this.itemSelected} className={cx('typeDropdown') + ' col-md-12'}>
				      <Dropdown.Toggle noCaret className=' col-md-12'>
				        {this.state.colType} <Glyphicon className={cx('columnCarrat')} glyph="menu-down" />
				      </Dropdown.Toggle>
				      <Dropdown.Menu className={cx('columnMenu')}>
				      	{generateTypes()}
				      </Dropdown.Menu>
				    </Dropdown>

				    
				    {columnTypes[this.state.colType]}
				    <div className='col-md-12'>
					    <button className="btn col-md-5" type="button" onClick={this.exitTypeMenu}>Cancel</button>
					    <button className="btn btn-primary col-md-5" type="button" onClick={this.saveTypeChanges}>Save</button>
					</div>
				</div>
				)
	}
}

export default connect()(MenuEditCol);