import React, { Component, PropTypes } from 'react';
import Cell from './Cell';
import RowOpener from './RowOpener'
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { SortablePane, Pane } from 'react-sortable-pane';
import {connect} from 'react-redux';
import {rowDrag} from 'actions/sheet';
import _ from 'lodash';

const cx = classNames.bind(styles);

class Grid extends Component {

  constructor(props) {
    super(props);
    this.generateRows=this.generateRows.bind(this);
    this.generateCells=this.generateCells.bind(this);
  }

  generateRows(grid) {
    return grid.map( (row, idx) => {
      return (
            <Pane
              className={cx('trow')}
              id={idx}
              key={idx}
              height={34}
              width={50}
              >
              <div className={cx('rnum')}>{idx + 1}</div>
              {this.props.disableAll ? <div className={cx('rnum')}></div> : <RowOpener className={cx('rnum')} row={idx}/>}
              {this.generateCells(row, idx)}
            </Pane>
        );
    });
  }

  generateCells (row, idx) {
    return this.props.headers.map((head) => {
      return (<Cell
        cell={row[head.id]}
        key={head.id}
        cellKey={head.id}
        row={row}
        rowIdx={idx}
        cellIdx={head.idx}
        disableAll={this.props.disableAll}
      /> );
    });
  }

  sendNewOrder (panes) {
    // this.props.dispatch(rowDrag(panes));
  }

render() {
  const paneStyle = {
    fontSize: "10px",
    textAlign:"center",
    paddingTop:"10px",
    height:"2px",
    width:"2px",
    border: "solid 1px #ccc",
    borderRadius: "5px",
    backgroundColor: "blue"
  };

  return (
    <SortablePane
          className={cx('trows')}
          direction="vertical"
          margin={0}
          disableEffect={false}
          onResize={(id, dir, size, rect) => null}
          onOrderChange={(oldArr,newArr) => this.sendNewOrder(newArr)}
      >
      {this.generateRows(this.props.grid)}
    </SortablePane>
  );
}
}

export default connect()(Grid);
