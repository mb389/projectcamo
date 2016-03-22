import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Glyphicon } from 'react-bootstrap';
import { showRowModal } from 'actions/sheet';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);


class RowOpener extends Component {
  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
  }

  openModal(){
    // dispatch show modal
    const { dispatch, rowIdx } = this.props;
    dispatch(showRowModal(this.props.row))
  }

  render() {
    return (
      <div className={cx('row-opener')}>
        <Glyphicon
          className={cx('cell-expand')}
          glyph="fullscreen"
          onClick={this.openModal} />
      </div>
    )
  }
}



export default connect()(RowOpener);
