import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';


const cx = classNames.bind(styles);

const ShareButton = (props) => {
  return (
    <div className={cx('ShareButton')}>
      <Button><Glyphicon glyph="share" /></Button>
    </div>
  );
};


export default ShareButton;
