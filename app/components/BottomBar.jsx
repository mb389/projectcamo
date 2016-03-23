import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/bottom-bar';
import ShareModal from './SpaceControls/ShareModal';


const cx = classNames.bind(styles);

const BottomBar = (props) => {
  return (
    <div className={cx('BottomBar')} >
      <div>
        <span className={cx('BottomRowCount')}>{props.rows} rows</span>
        <ShareModal />
      </div>
    </div>
  );
};


export default BottomBar;
