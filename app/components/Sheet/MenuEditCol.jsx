import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import ColumnOptions from './ColumnOptions';

const cx = classNames.bind(styles);


export default class MenuEditCol extends Component {
	constructor(props,state){
		super(props, state);
		this.state = {selectedType: false};

		this.saveTypeChanges = this.saveTypeChanges.bind(this);
		this.itemSelected = this.itemSelected.bind(this);
	}

	itemSelected(e, ekey) {
		console.log('itemSelected', ekey);
		this.setState({selectedType: ekey});
	}

	saveTypeChanges() {
		console.log('saveTypeChanges');
		this.props.exitTypeMenu();
	}

	render () {
		let columnTypes = ['Text','Number','Checkbox','Select'];

		function generateTypes () {
				return columnTypes.map((type, idx) =>
				{
					return (<MenuItem key={idx+1} eventKey={type}>{type}</MenuItem>);
				})
			}

		return (
				<div className={cx('editNameAndType')}>
					<div className={cx('thead') + ' col-md-12'} contentEditable>{this.props.data.name}</div>
					<Dropdown id="dropdown-custom-1" onSelect={this.itemSelected} className={cx('typeDropdown') + ' col-md-12'}>
				      <Dropdown.Toggle noCaret className=' col-md-12'>
				        {this.state.selectedType || this.props.data.type} <Glyphicon className={cx('columnCarrat')} glyph="menu-down" />
				      </Dropdown.Toggle>
				      <Dropdown.Menu className={cx('columnMenu')}>
				      	{generateTypes()}
				      </Dropdown.Menu>
				    </Dropdown>

				    <p className='col-md-12'> A single line of text. You can optionally prefill each cell with a default value: </p>
				    <div className='col-md-12'>
					    <button className="btn col-md-5" type="button" onClick={this.props.exitTypeMenu}>Cancel</button>
					    <button className="btn btn-primary col-md-5" type="button" onClick={this.saveTypeChanges}>Save</button>
					</div>
				</div>
				)
	}
}