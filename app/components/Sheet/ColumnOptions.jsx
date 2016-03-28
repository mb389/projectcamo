import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { sortColumn, removeColumn, insertColumn, formulaColumn, showMap } from 'actions/sheet';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import MenuEditCol from './ColumnEditMenu/MenuEditCol';

const cx = classNames.bind(styles);

class ColumnOptions extends Component {
	constructor(props,state){
		super(props, state);
		this.state = {
			view: (this.props.data.type ? 'dropdown' : 'editNameAndType')
		};
		this.handleSelection = this.handleSelection.bind(this);
		this.changeType = this.changeType.bind(this);
		this.duplicate = this.duplicate.bind(this);
		this.sortAsc = this.sortAsc.bind(this);
		this.sortDec = this.sortDec.bind(this);
		this.exitTypeMenu = this.exitTypeMenu.bind(this);
		this.removeCol = this.removeCol.bind(this);
		this.insertLeft = this.insertLeft.bind(this);
		this.insertRight = this.insertRight.bind(this);
		this.showMap = this.showMap.bind(this);
		this.dataType = this.dataType.bind(this);
	}

	handleSelection(evt, evtKey){
		this[evtKey]();
	}

	exitTypeMenu() {
		this.setState({view: 'dropdown'});
	}

	changeType() {
		this.setState({view: 'editNameAndType'});
	}

	duplicate() {
		let dupFn = function (element) {
			return element;
		};
		this.props.dispatch(formulaColumn('map', dupFn, this.props.data));
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

	showMap() {
		this.props.dispatch(showMap(this.props.data.id));
	}

	dataType() {
		if(!this.props.data) return ''
		switch (this.props.data.type) {
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
					<MenuItem key="9" eventKey="showMap">View as Map</MenuItem>
					];

				if(this.props.data.id !== "100") items.push(<MenuItem key="6" eventKey="removeCol">Delete Column</MenuItem>);

				return items;
			}

			viewing = (
				<Dropdown id="dropdown-custom-1" onSelect={this.handleSelection} className={cx('columnWidth')}>
			      <Dropdown.Toggle noCaret className={cx('thead')}>
							<Glyphicon className={cx('columnType')} glyph={this.dataType()} />
							{this.props.data.name}
							<Glyphicon className={cx('columnCarrat')} glyph="menu-down" />
			      </Dropdown.Toggle>
			      <Dropdown.Menu className={cx('columnWidth')}>
			      	{generateMenuItems.call(this)}
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
