import React, { Component, PropTypes } from 'react';
import Cell from './Cell';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

function generateRows(grid) {
  return grid.map( (row, key) => {
    return (
    <div className={cx('trow')} key={key}>
      <div className={cx('rnum cell')}>{key}</div>
      {generateCells(row)}
    </div>);
  });
}

function generateCells (row) {
    const cells = [];
    for (let key in row) {
      cells.push(<Cell cell={row[key]} key={key}/>);
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
