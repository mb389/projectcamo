import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/bottom-bar';
import BottomReducers from './BottomReducers';

const cx = classNames.bind(styles);

function generateColumnReducers (columns) {
  return columns.map((column) => {
      return (
          <BottomReducers column={column} key={column.id}/>
          // component of dropdown for reducers;
      )
  })
}

const BottomBar = (props) => {
	console.log('props', props);
  return (
    <div className={cx('BottomBar')} >
      <div className={cx('BottomRowCount')}>
        <span >{props.rows} rows</span>
      </div>
        {generateColumnReducers(props.columns)}
    </div>
  );
};


export default BottomBar;