import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { updateCell} from 'actions/sheet';
import styles from 'css/components/table';
import { DropdownButton, Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';


const cx = classNames.bind(styles);

export default class SelectOptionCell extends Component {
	constructor(props, state){
		super(props, state)
    this.handleChange = this.handleChange.bind(this)
	}


	handleChange(e, ekey){
	  const { dispatch, cellKey, rowIdx, row } = this.props;
    dispatch(updateCell(ekey, cellKey, rowIdx, null, []));
	}

	render () {
    function generateOptions(arr) {
      return arr.map((opt, idx) => {
        return (<MenuItem key={idx} eventKey={opt}>
                   {opt}
                </MenuItem>)
      })
    }

    return (<Dropdown id="dropdown-custom-1" 
              onSelect={this.handleChange} 
              className={cx('typeDropdown') + ' col-xs-12'}>
              <Dropdown.Toggle noCaret className=' col-xs-12'>
                {this.props.cell.data}
                <Glyphicon className={cx('columnCarrat')} glyph="menu-down" />
              </Dropdown.Toggle>
              <Dropdown.Menu className={cx('columnMenu')}>
                  {generateOptions(this.props.cell.selectOptions)}
              </Dropdown.Menu>
            </Dropdown>)
  }

}