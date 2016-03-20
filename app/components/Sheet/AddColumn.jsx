import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { addColumn } from 'actions/sheet';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

class AddColumn extends Component {
	constructor(props, state){
		super(props, state)
		this.addColumn = this.addColumn.bind(this)
	}

  addColumn(){
    console.log("column add")
    this.props.dispatch(addColumn())
  }

  render () {
    return (
      <button className="btn btn-primary" type="button" onClick={this.addColumn}>Add Column</button>
    );
	}
}


export default connect()(AddColumn);

