import React from 'react';
import Cell from './Cell';
import RowOpener from './RowOpener';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

const Grid = (props) => {
  function generateCells(row, idx) {
    return props.headers.map((head) => (
      <Cell
        cell={row[head.id]}
        key={head.id}
        cellKey={head.id}
        row={row}
        rowIdx={idx}
        cellIdx={head.idx}
        disableAll={props.disableAll}
        searching={props.searching}
      />
    ));
  }

  function generateRows(grid, filtered) {
    return grid.map((row, idx) => (
      <div className={filtered.indexOf(idx) === -1 ? cx('trow') : cx('trowHidden')} key={idx}>
        <div className={cx('rnum')}>{idx + 1}</div>
        {props.disableAll ? (
          <div className={cx('rnum')} />
        ) : (
          <RowOpener className={cx('rnum')} row={idx} />
        )}
        {generateCells(row, idx)}
      </div>
    ));
  }

  return (
    <div className={cx('trows')}>
      {generateRows(props.grid ? props.grid : [], props.filteredRows ? props.filteredRows : [])}
    </div>
  );
};

export default Grid;
