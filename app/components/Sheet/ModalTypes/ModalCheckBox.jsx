import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { updateModalCell } from 'actions/sheet';
import styles from 'css/components/table';
import { Input } from 'react-bootstrap';


const cx = classNames.bind(styles);

class ModalCheckBox extends Component {
	constructor(props, state){
		super(props, state)
    this.handleChange = this.handleChange.bind(this)
	}


	handleChange(evt){
	  const { dispatch, cellKey, rowIdx, row } = this.props;
    let val;
    (this.props.cell.data === 'on') ? val = 'off' : val = 'on'
    dispatch(updateModalCell(val, cellKey, rowIdx));
	}

	render () {

    return (<Input 
      className={cx('cellCheckBox')} 
      type="checkbox" label=" " 
      checked={this.props.cell.data === 'on'} 
      onClick={this.handleChange}/>
    )
  }

}


export default ModalCheckBox;
