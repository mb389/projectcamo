import React, { PropTypes, Component } from 'react';
import SearchButton from './SearchButton';
import ShareButton from './ShareButton';
import HistoryButton from './HistoryButton';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';


const cx = classNames.bind(styles);

const MagicBar = (props) => {
  return (
    <div className={cx('MagicBar')} >
      <SearchButton />
      <div className={cx('FormulaBar')}><input className={cx('InputToSearch')} placeholder="Formula Bar Search" /></div>
      <HistoryButton />
      <ShareButton />
    </div>
  );
};


export default MagicBar;
