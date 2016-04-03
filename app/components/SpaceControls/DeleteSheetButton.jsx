import React, { PropTypes, Component } from 'react';
import ContentEditable from 'react-contenteditable';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';
import { Button, Glyphicon } from 'react-bootstrap';


const cx = classNames.bind(styles);

const DeleteButton = (props) => {
  return (
    <div className={cx('DeleteButton')}>
      <Button onDoubleClick={props.deleteSheet}><Glyphicon glyph="remove" /></Button>
    </div>
  );
};


export default DeleteButton;
