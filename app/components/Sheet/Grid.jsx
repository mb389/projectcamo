import React, { Component, PropTypes } from 'react';
import Cell from './Cell';
import RowOpener from './RowOpener'
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

const Grid = (props) => {

  function generateRows(grid) {
    return grid.map( (row, idx) => {
      return (
      <div className={cx('trow')} key={idx}>
        <div className={cx('rnum')}>{idx + 1}</div>
        <RowOpener className={cx('rnum')} row={idx}/>
        {generateCells(row, idx)}
      </div>);
    });
  }

  function generateCells (row, idx) {
    return props.headers.map((head) => {
      return (<Cell
        cell={row[head.id]}
        key={head.id}
        cellKey={head.id}
        row={row}
        rowIdx={idx}
        cellIdx={head.idx}/> );
    });
  }

  return (
    <div className={cx('trows')}>
      {generateRows(props.grid)}
    </div>
  );
}

export default Grid;
