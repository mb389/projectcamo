import React, { PropTypes, Component } from 'react';
import SearchButton from './SearchButton';
import ShareButton from './ShareButton';
import SaveButton from './SaveButton';
import SuperBar from './SuperBar';
import HistoryButton from './HistoryButton';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';


const cx = classNames.bind(styles);

const MagicBar = (props) => {
  return (
    <div className={cx('MagicBar')} >
      <SearchButton />
      <SuperBar {...props} />
      <SaveButton saveSheet={props.saveSheet}/>
      <HistoryButton />
      <ShareButton />

    </div>
  );
};


export default MagicBar;
