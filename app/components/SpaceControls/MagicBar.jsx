import React, { PropTypes, Component } from 'react';
import SearchButton from './SearchButton';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';


const cx = classNames.bind(styles);

const MagicBar = (props) => {
  return (
    <div className={cx('MagicBar')} >
      <SearchButton />
      <div className={cx('FormulaBar')}><span>Formula bar / Contents of the selected cell</span></div>
    </div>
  );
};


export default MagicBar;
