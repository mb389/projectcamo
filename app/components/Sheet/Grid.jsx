import React, { Component, PropTypes } from 'react';
import { List } from 'immutable'
import Cell from './Cell';
import RowOpener from './RowOpener'
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

const Grid = (props) => {

  function generateRows(grid, filtered) {
    return grid.map( (row, idx) => {
        return (
          <div className={!filtered.has(idx) ? cx('trow') : cx('trowHidden')} key={idx}>
            <div className={cx('rnum')}>{idx + 1}</div>
            {props.disableAll ? <div className={cx('rnum')}></div> : <RowOpener className={cx('rnum')} row={idx}/>}
            {generateCells(row, idx)}
          </div>);
        });
  }

  function generateCells (row, idx) {
    return props.headers.map((head) => {
      return (<Cell
        cell={row.get(head.get('id'))}
        key={head.get('id')}
        cellKey={head.get('id')}
        row={row}
        rowIdx={idx}
        cellIdx={head.get('idx')}
        disableAll={props.disableAll}
        searching={props.searching}
      /> );
    });
  }

  return (
    <div className={cx('trows')}>
      {generateRows(props.grid ? props.grid : [], props.filteredRows ? props.filteredRows : List())}
    </div>
  );
}

export default Grid;
