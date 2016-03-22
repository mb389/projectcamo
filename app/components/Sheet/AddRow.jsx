import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { addRow } from 'actions/sheet';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

class AddRow extends Component {
	constructor(props, state){
		super(props, state)
		this.addRow = this.addRow.bind(this)
	}

  addRow(){
    this.props.dispatch(addRow())
  }

  render () {
    return (
      <button className={cx('addRow') } onClick={this.addRow}>+</button>
    );
	}
}


export default connect()(AddRow);
