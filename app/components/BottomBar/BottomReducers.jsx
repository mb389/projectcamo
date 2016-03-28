import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/bottom-bar';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

const cx = classNames.bind(styles);

export default class BottomReducers extends Component {
	constructor(props,state){
		super(props, state);
		this.state = {selectedReducer: 'Count', reducerReturn: this.reductionFunctionSwitch('Count')};

		this.generateMenuItems = this.generateMenuItems.bind(this);
		this.handleReduction = this.handleReduction.bind(this);
		this.reductionFunctionSwitch = this.reductionFunctionSwitch.bind(this);
	}

	generateMenuItems () {
		return ['Count', 'Sum','Average','Median','Min','Max'].map((reducer, idx) => {
			return (<MenuItem key={idx} eventKey={reducer}>{reducer}</MenuItem>);
			// reducer : {output of reducer}
		})
	}

	handleReduction (e, ekey) {
		this.setState({selectedReducer: ekey});
		this.setState({reducerReturn: this.reductionFunctionSwitch(ekey)})
	}

	reductionFunctionSwitch (func) {
		function rounder (number, places){
			let tens = Math.pow(10, places);
			return Math.round(number*tens)/tens;
		}
		if(!this.props.columnData) return null;
		switch (func) {
			case 'Count': console.log(this.props.columnData); return this.props.columnData.reduce((accum, elem) => {if(elem!=="false") return accum+1; return accum;}, 0);
			case 'Average': return rounder((this.props.columnData.reduce(((a, b) => Number(a) + Number(b)))/this.props.columnData.length), 2);
			case 'Median': return (this.props.columnData.sort((a, b) => Number(a) - Number(b))[Math.floor(this.props.columnData.length/2)]);
			case 'Min': return Math.min.apply(null, this.props.columnData);
			case 'Max': return Math.max.apply(null, this.props.columnData);
			default: return rounder(this.props.columnData.reduce(((a, b) => Number(a) + Number(b))), 2);
		}
	}

	render () {
		return (
			<Dropdown id="dropdown-custom-1" dropup onSelect={this.handleReduction} className={cx('BottomReducers')}>
			  <Dropdown.Toggle noCaret className={cx('DropdownHead')}>
			    {this.state.selectedReducer}: {this.state.reducerReturn || " "}
						<Glyphicon className={cx('DropdownCarrat')} glyph="menu-down" />
			  </Dropdown.Toggle>
			  <Dropdown.Menu className={cx('MenuItem')}>
			  	{this.generateMenuItems()}
			  </Dropdown.Menu>
			</Dropdown>
			)
	}
}
