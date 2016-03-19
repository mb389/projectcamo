import React, { Component, PropTypes } from 'react';
import Cell from './Cell';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

function generateRows(grid) {
  return grid.map( (row, idx) => {
    return (
    <div className={cx('trow')} key={idx}>
      <div className={cx('rnum')}>{idx}</div>
      {generateCells(row, idx)}
    </div>);
  });
}

function generateCells (row, idx) {
    const cells = [];
    for (let key in row) {
      cells.push(<Cell cell={row[key]} key={key} cellKey={key} row={row} rowIdx={idx} cellIdx={cells.length}/> );
    }
    return cells;
}

const Grid = (props) => {

  return (
    <div className={cx('trows')}>
      {generateRows(props.grid)}
    </div>
  );
}

export default Grid;

