import React, {PropTypes, Component} from 'react';
import styles from 'css/components/modal';
import classNames from 'classnames/bind';
import {Glyphicon} from 'react-bootstrap';
import {getUser} from 'actions/users';
const cx = classNames.bind(styles);

const ShareModalCollabs = (props) => {

const collabs = !props.collabs ? [] : props.collabs.filter((v,i) => props.collabs.indexOf(v)===i);

const collaborsToDisplay =
collabs.map(el => {
  return (
    <div key={el}>
      <div className={cx('userImg')}></div>
      <p>{el}</p></div>
    )
});

  return (
    <div>
    {collaborsToDisplay}
  </div>
  )


}

export default ShareModalCollabs;
