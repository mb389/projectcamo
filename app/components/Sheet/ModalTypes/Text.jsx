import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateModalCell } from 'actions/sheet';
import styles from 'css/components/table';
import ContentEditable from 'react-contenteditable';

const cx = classNames.bind(styles);

class TextModal extends Component {
	constructor(props, state){
		super(props, state)
    this.state = {html: this.props.cell.data}
		this.handleChange = this.handleChange.bind(this)
	}

  handleChange(evt){
  	const { dispatch, cellKey, rowIdx } = this.props;
    this.setState({html: evt.target.value});
    // dispatch(updateModalCell(evt.target.value, cellKey, rowIdx))
  }

  render () {
    return (
      <ContentEditable 
        html={this.state.html} // innerHTML of the editable div
        disabled={false}       // use true to disable edition
        onChange={this.handleChange} // handle innerHTML change
      />
    );
	}
}


export default connect()(TextModal);

