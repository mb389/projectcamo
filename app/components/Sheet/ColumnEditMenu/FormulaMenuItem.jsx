import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';

const cx = classNames.bind(styles);

const FormulaMenuItem = (props) => {
	// componenet will mount fetachformals 
	// if the form is already loaded then don't fetch?
	function createFunctionList() {
		return props.formulas.map((elem, idx) => {
			// on select={props.handleFormulaNameChange}
			return (<MenuItem key={idx} eventKey={elem.functionStr}>{elem.name}</MenuItem>);
		})
	}

	function functionSelected(e, ekey){
		props.handleFormulaCustom(null, ekey);
		props.handleFormulaNameChange(e);
	}


	return (
	    <div className='col-md-12'>
			<h5 className='col-md-12'>Allows you to create custom formulas for manipulating your data.</h5>
			<div className='row clearfix'>
				<label className='col-md-4'>Name:</label>
				<ContentEditable className='col-md-8' id='handleFormulaNameChange' style={{backgroundColor: 'white'}} onChange={props.handleFormulaNameChange} html={props.formulaName} /> 
			</div>
				<Dropdown id="dropdown-custom-1" onSelect={functionSelected} className={cx('typeDropdown') + ' col-md-12'}>
				      <Dropdown.Toggle noCaret className=' col-md-12'>
				        {props.formulaName} <Glyphicon className={cx('columnCarrat')} glyph="menu-down" />
				      </Dropdown.Toggle>
				      <Dropdown.Menu className={cx('columnMenu')}>
				      	{createFunctionList()}
				      </Dropdown.Menu>
			    </Dropdown>
			<textarea onChange={props.handleFormulaCustom} className='col-md-12' value={props.formula} />
			<button className="btn col-md-8 col-md-offset-4" type="button" onClick={props.formulaUpload}>Upload Formula</button>
		</div>
		);
}

export default FormulaMenuItem;