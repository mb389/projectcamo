import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';

const cx = classNames.bind(styles);

const FormulaMenuItem = (props) => {
	return (
	    <div className='col-md-12'>
			<p className='col-md-12'>Allows you to create custom formulas for manipulating your data.</p>
			<ContentEditable className='clearfix col-md-12' onChange={props.handleFormulaNameChange} html={props.formulaName||'Please Name'} /> <br></br>

			<textarea onChange={props.handleFormulaCustom} className='col-md-12' value={props.formula} />
			<button className="btn col-md-8 col-md-offset-4" type="button" onClick={props.formulaUpload}>Upload Formula</button>
		</div>
		);
}

export default FormulaMenuItem;