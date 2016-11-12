import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';
import { showShareModal } from 'actions/SpaceControls';

const cx = classNames.bind(styles);

class ShareButton extends Component {
  constructor(props) {
    super(props);
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    // dispatch show modal
    console.log(this.props)
    const { dispatch } = this.props;
    dispatch(showShareModal());
  }

  render() {
    return (
      <div className={cx('ShareButton')}>
        <Button onClick={this.openModal}><Glyphicon glyph="share" /></Button>
      </div>
    );
  }
}


export default ShareButton;
