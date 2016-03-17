import React, { Component, PropTypes } from 'react';
import ColumnOptions from './ColumnOptions';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

function generateColumnOptions (headers) {
  return headers.map((header, key) => {
      return (
          <ColumnOptions data={header} key={header.id}/>
      )
  })
}

const Headers = (props) => {
  return (
      <div className={cx('theaders')}>
        <div className={cx('rnum')} />
        {generateColumnOptions(props.headers)}
      </div>
    );
}

export default Headers;





