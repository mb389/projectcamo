import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

const cx = classNames.bind(styles);

export default class ColumnOptions extends Component {

	render () {
		return (
				//  	<DropdownButton className={cx('thead')} bsStyle='default' title={this.props.data.name }
				//  key={this.props.data.id} id={`dropdown-${this.props.data.name}`}>
				// {generateMenuItems()}
		    // </DropdownButton>
				<Dropdown id="dropdown-custom-1">
		      <Dropdown.Toggle noCaret className={cx('thead')}>
		        {this.props.data.name}
						<Glyphicon className={cx('columnCarrat')} glyph="chevron-down" />
		      </Dropdown.Toggle>
		      <Dropdown.Menu className={cx('columnMenu')}>
		        <MenuItem eventKey="1">Action</MenuItem>
		        <MenuItem eventKey="2">Another action</MenuItem>
		        <MenuItem eventKey="3" active>Active Item</MenuItem>
		        <MenuItem eventKey="4">Separated link</MenuItem>
		      </Dropdown.Menu>
		    </Dropdown>
		);
	}
}

function generateMenuItems () {
	var items = [
		<MenuItem eventKey="1" active>Sort</MenuItem>,
		<MenuItem eventKey="2">Another action</MenuItem>,
		<MenuItem eventKey="3">Active Item</MenuItem>,
		<MenuItem eventKey="4">Separated link</MenuItem>
		];

	return items;
}
