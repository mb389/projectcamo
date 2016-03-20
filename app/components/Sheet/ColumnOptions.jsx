import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

const cx = classNames.bind(styles);

export default class ColumnOptions extends Component {
	constructor(props,state){
		super(props, state);
		this.state = {view: 'dropdown'};

		this.handleSelection = this.handleSelection.bind(this);
		this.changeType = this.changeType.bind(this);
		this.rename = this.rename.bind(this);
		this.duplicate = this.duplicate.bind(this);
		this.sortAsc = this.sortAsc.bind(this);
		this.sortDec = this.sortDec.bind(this);
		this.exitTypeMenu = this.exitTypeMenu.bind(this);
		this.saveTypeChanges = this.saveTypeChanges.bind(this);
		this.itemSelected = this.itemSelected.bind(this);
	}

	handleSelection(evt, evtKey){
		this[evtKey]();
	}

	itemSelected(e, ekey) {
		console.log('itemSelected', ekey);
		this.setState({selectedType: ekey});
	}

	exitTypeMenu() {
		console.log('exitTypeMenu');
		this.setState({view: 'dropdown'});
	}

	saveTypeChanges() {
		console.log('saveTypeChanges');
		this.exitTypeMenu();
	}

	changeType() {
		console.log('changeType');
		this.setState({view: 'editNameAndType'});
	}

	rename() {
		console.log('rename');
		this.setState({view: 'editNameAndType'});
	}

	duplicate() {
		console.log('duplicate this column');

	}

	sortAsc() {
		console.log('run sort on column ascending');

	}

	sortDec() {
		console.log('run sort on column descending');
	}

	render () {
		let viewing;
		if (!this.state || this.state.view === 'dropdown') {
			function generateMenuItems () {
				var items = [
					<MenuItem key="1" eventKey="changeType">Change Type</MenuItem>,
					<MenuItem key="2" eventKey="rename">Rename Column</MenuItem>,
					<MenuItem key="3" eventKey="duplicate">Duplicate Field</MenuItem>,
					<MenuItem key="4" eventKey="sortAsc">Sort A -> Z</MenuItem>,
					<MenuItem key="5" eventKey="sortDec">Sort Z -> A</MenuItem>
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

			let columnTypes = ['Text','Number','Checkbox','Select'];

			function generateTypes () {
				return columnTypes.map((type, idx) =>
				{
					return (<MenuItem key={idx+1} eventKey={type}>{type}</MenuItem>);
				})
			}

			viewing = (
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
					    <button className="btn col-md-5" type="button" onClick={this.exitTypeMenu}>Cancel</button>
					    <button className="btn btn-primary col-md-5" type="button" onClick={this.saveTypeChanges}>Save</button>
					</div>
				</div>
				)
		}

		return (
			<div className={cx('thead')}>
				{viewing}
			</div>
		);
	}
}
