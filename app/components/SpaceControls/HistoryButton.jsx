import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';


const cx = classNames.bind(styles);

const HistoryButton = (props) => {
  return (
    <div className={cx('HistoryButton')}>
      <Button><Glyphicon glyph="backward" /></Button>
    </div>
  );
};


export default HistoryButton;
