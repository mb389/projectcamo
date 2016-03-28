import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { Label } from 'react-bootstrap';


const cx = classNames.bind(styles);


const LinkLabel = (props) => {
  let styles = {
    fontSize: '20px',
    display: 'inline-block',
    clear: 'both'
  }

  return (
      <div style={styles}>
        <Label bsStyle="info">{props.data} </Label>
      </div>
    );
}

export default LinkLabel;
