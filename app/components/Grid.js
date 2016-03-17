import React, { Component, PropTypes } from 'react';
import Cell from './Cell';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

export default class Grid extends Component {

  render () {
    const grid = this.props.grid.map((row, key) => {
      const cells = []
      for (let key in row) {
        cells.push(<Cell cell={row[key]} key={key}/>);
      }
      return (
      <div className={cx('trow')} key={key}>
        {cells}
      </div>);
    });

    return (
      <div>
        {grid}
      </div>
    );
  }
}

