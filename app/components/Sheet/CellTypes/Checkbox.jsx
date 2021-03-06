import React from 'react';
import classNames from 'classnames/bind';
import { updateCell, updateModalCell } from 'actions/sheet';
import styles from 'css/components/table';
import { Input } from 'react-bootstrap';


const cx = classNames.bind(styles);

class CheckBox extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { dispatch, cellKey, rowIdx, row } = this.props;
    let val;
    if (this.props.cell.data === 'checked') {
      val = 'off';
    } else {
      val = 'checked';
    }

    const recalculateCells = [];
    for (const cell in row) {
      if (row[cell].type === 'Formula') {
        row[cell].col = cell;
        recalculateCells.push(row[cell]);
      }
    }

    if (this.props.parent === 'RowModal') dispatch(updateModalCell(val, cellKey, rowIdx, null, recalculateCells));
    else dispatch(updateCell(val, cellKey, rowIdx, null, recalculateCells));
  }

  render() {
    return (<Input
      className={cx('cellCheckBox')}
      type="checkbox" style={{ zoom: 1.05 }} label=" "
      checked={this.props.cell.data === 'checked'}
      onChange={this.handleChange}
    />
    );
  }

}


export default CheckBox;
