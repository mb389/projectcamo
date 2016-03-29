import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateModalCell } from 'actions/sheet';
import styles from 'css/components/table';
import Slider from 'react-slick';

class FilepickerInput extends React.Component {
  constructor(props, state){
    super(props, state)
    this.handleChangeFileUrl = this.handleChangeFileUrl.bind(this)
  }

  componentDidMount() {
    const filepickerElement = this.refs.filepicker;
    if (typeof filepicker !== 'undefined') {
      // Single-page app integration: https://developers.filepicker.com/docs/support/integration/117
      filepicker.constructWidget(filepickerElement);
    }
    filepickerElement.addEventListener('change', this.handleChangeFileUrl, false);
  }

  componentWillUnmount() {
    this.refs.filepicker.removeEventListener('change', this.handleChangeFileUrl, false);
  }

  render() {
    return <input
      data-fp-apikey="ACRQlXxYvQvWW0aclugElz"
      ref="filepicker"
      type="filepicker" id="fpOverlay"/>
  }

  handleChangeFileUrl(evt) {
    this.props.dispatch(updateModalCell(evt.target.value, this.props.cellKey, this.props.rowIdx, true))
  }

}

export default connect()(FilepickerInput);