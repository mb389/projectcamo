import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';


const cx = classNames.bind(styles);

const AddSheetButton = (props) => {
  return (
    <div className={cx('AddSheetButton', 'SheetButton')}>+</div>
  );
};


export default AddSheetButton;
