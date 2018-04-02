import React from 'react';
import styles from 'css/components/modal';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const ShareModalCollabs = (props) => {
  const collabs = !props.collabs
    ? []
    : props.collabs.filter((v, i) => props.collabs.indexOf(v) === i);

  const collaborsToDisplay = collabs.map((el) => (
    <div key={el}>
      <div className={cx('userImg')} />
      <p>{el}</p>
    </div>
  ));

  return <div>{collaborsToDisplay}</div>;
};

export default ShareModalCollabs;
