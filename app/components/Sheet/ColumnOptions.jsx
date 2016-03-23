import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { sortColumn, removeColumn, insertColumn, formulaColumn } from 'actions/sheet';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import MenuEditCol from './MenuEditCol';

const cx = classNames.bind(styles);

class ColumnOptions extends Component {
	constructor(props,state){
		super(props, state);
		this.state = {view: 'dropdown'};

		this.handleSelection = this.handleSelection.bind(this);
		this.changeType = this.changeType.bind(this);
		this.duplicate = this.duplicate.bind(this);
		this.sortAsc = this.sortAsc.bind(this);
		this.sortDec = this.sortDec.bind(this);
		this.exitTypeMenu = this.exitTypeMenu.bind(this);
		this.removeCol = this.removeCol.bind(this);
		this.insertLeft = this.insertLeft.bind(this);
		this.insertRight = this.insertRight.bind(this);
	}

	handleSelection(evt, evtKey){
		this[evtKey]();
	}

	exitTypeMenu() {
		console.log('ColOpt exitTypeMenu');
		this.setState({view: 'dropdown'});
	}

	changeType() {
		console.log('changeTypeorName');
		this.setState({view: 'editNameAndType'});
	}

	duplicate() {
		let dup = function (element) {
			return element;
		};
		this.props.dispatch(formulaColumn('map', dup, this.props.data));
	}

	insertLeft() {
		this.props.dispatch(insertColumn(this.props.data.idx));
	}

	insertRight() {
		this.props.dispatch(insertColumn(1+this.props.data.idx));
	}

	removeCol() {
		this.props.dispatch(removeColumn(this.props.data.id));
	}

	sortAsc() {
		this.props.dispatch(sortColumn(this.props.data.id, 1));
	}

	sortDec() {
		this.props.dispatch(sortColumn(this.props.data.id, -1));
	}

	render () {
		let viewing;
		if (!this.state || this.state.view === 'dropdown') {
			function generateMenuItems () {
				var items = [
					<MenuItem key="1" eventKey="changeType">Rename Column</MenuItem>,
					<MenuItem key="2" eventKey="changeType">Change Type</MenuItem>,
					<MenuItem key="3" eventKey="duplicate">Duplicate Field</MenuItem>,
					<MenuItem key="7" eventKey="insertLeft"> Insert Left </MenuItem>,
					<MenuItem key="8" eventKey="insertRight"> Insert Right </MenuItem>,
					<MenuItem key="4" eventKey="sortAsc">Sort A -> Z</MenuItem>,
					<MenuItem key="5" eventKey="sortDec">Sort Z -> A</MenuItem>,
					<MenuItem key="6" eventKey="removeCol">Delete Column</MenuItem>
					];
				return items;
			}

			viewing = (
				<Dropdown id="dropdown-custom-1" onSelect={this.handleSelection} className={cx('columnWidth')}>
			      <Dropdown.Toggle noCaret className={cx('thead')}>
			        {this.props.data.name}
							<Glyphicon className={cx('columnCarrat')} glyph="menu-down" />
			      </Dropdown.Toggle>
			      <Dropdown.Menu className={cx('columnWidth')}>
			      	{generateMenuItems()}
			      </Dropdown.Menu>
			    </Dropdown>)

		} else if (this.state.view === 'editNameAndType') {
			viewing = (<MenuEditCol data={this.props.data} exitTypeMenu={this.exitTypeMenu}/>)
		}

		return (
			<div className={cx('thead')}>
				{viewing}
			</div>
		);
	}
}

export default connect()(ColumnOptions);
