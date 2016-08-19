import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { updateCell, updateModalCell } from 'actions/sheet';
import styles from 'css/components/table';
import { Input, Glyphicon } from 'react-bootstrap';


const cx = classNames.bind(styles);

export default class SelectOptionCell extends Component {
	constructor(props, state){
		super(props, state)
    this.handleChange = this.handleChange.bind(this)
	}


	handleChange(e){
	  const { dispatch, cellKey, rowIdx, row } = this.props;
    let val = e.target.value;

    console.log("row", row);
    let recalculateCells = []
    for (let cell in row) {
      if (row[cell].type === 'Formula') {
        row[cell].col = cell;
        recalculateCells.push(row[cell]);
      }
    }

    if (this.props.parent==="RowModal") dispatch(updateModalCell(val, cellKey, rowIdx, null, recalculateCells));
    else dispatch(updateCell(val, cellKey, rowIdx, null, recalculateCells))
	}

	render () {
    function generateOptions(arr) {
      return arr.map((opt, idx) => {
        return (<option className={cx('cellSelectOption')} key={idx} value={opt}>{opt}</option>)
      })
    }

    return (<Input type="select"
                  className={cx('cellSelect')}
                  placeholder={this.props.cell.data}
                  value={this.props.cell.data}
                  onChange={this.handleChange}>
                {generateOptions(this.props.cell.selectOptions)}
            </Input>)
  }

}
