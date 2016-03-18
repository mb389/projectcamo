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
      cells.push(<Cell cell={row[key]} key={key} cellKey={key} rowIdx={idx} cellIdx={cells.length}/> );
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


// export default class Grid extends Component {

//   constructor(props, state){
//     super(props, state)
//     this.state = {showModal: false, html: this.props.cell.data}

//     this.handleChange = this.handleChange.bind(this)
//   }

//   generateCells (row) {
//     const cells = [];
//     for (let key in row) {
//       cells.push(<Cell cell={row[key]} key={key} idx={cells.length}/> );
//     }
//     return cells;
//   }
  
//   generateRows(grid) {
//     return grid.map( (row, key) => {
//       return (
//       <div className={cx('trow')} key={key}>
//         <div className={cx('rnum')}>{key}</div>
//         {generateCells(row)}
//       </div>);
//     });
//   }

//   handleChange(evt){
//     console.log("changed", evt.target.value)
//     this.setState({html: evt.target.value});
//   }

//   render(){
//     return (
//       <div className={cx('trows')}>
//         {generateRows(props.grid)}
//       </div>
//     );
//   }

// }