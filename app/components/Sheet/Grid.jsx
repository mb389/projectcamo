import React, { Component, PropTypes } from 'react';
import Cell from './Cell';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

// function generateCells (row, idx) {
//     // const cells = [];
//     // for (let key in row) {
//     //   cells.push(<Cell cell={row[key]} key={key} cellKey={key} row={row} rowIdx={idx} cellIdx={cells.length}/> );
//     // }
//     // return cells;

//     return this.props.headers.map((head) => {
//       return (<Cell cell={row[head.id]} key={head.id} cellKey={head.id} row={row} rowIdx={idx} cellIdx={cells.length}/> );
//     });
// }

const Grid = (props) => {

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
    return props.headers.map((head) => {
      return (<Cell cell={row[head.id]} key={head.id} cellKey={head.id} row={row} rowIdx={idx} cellIdx={head.idx}/> );
    });
  }

  return (
    <div className={cx('trows')}>
      {generateRows(props.grid)}
    </div>
  );
}

export default Grid;

