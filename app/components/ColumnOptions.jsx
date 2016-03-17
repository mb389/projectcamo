import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { SplitButton } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

const cx = classNames.bind(styles);

export default class ColumnOptions extends Component {

	render () {
		return (
	  	 	<SplitButton className={cx('thead')} bsStyle='default' title={this.props.data.name} key='1' id={`dropdown-${this.props.data.name}`}>
				{generateMenuItems()};
		    </SplitButton>
		);
	}
}

function generateMenuItems () {
	var items = [
		<MenuItem eventKey="1" active>Sort</MenuItem>,
		<MenuItem eventKey="2">Another action</MenuItem>,
		<MenuItem eventKey="3">Active Item</MenuItem>,
		<MenuItem divider />,
		<MenuItem eventKey="4">Separated link</MenuItem>
		];

	return items;
}

