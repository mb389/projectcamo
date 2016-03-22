import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/bottom-bar';


const cx = classNames.bind(styles);

const BottomBar = (props) => {
  return (
    <div className={cx('BottomBar')} >
      <div>
        <span className={cx('BottomRowCount')}>{props.rows} rows</span>
      </div>
    </div>
  );
};


export default BottomBar;
