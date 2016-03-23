import React, { PropTypes, Component } from 'react';
import SearchButton from './SearchButton';
import ShareButton from './ShareButton';
import SaveButton from './SaveButton';
import HistoryButton from './HistoryButton';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';


const cx = classNames.bind(styles);

const SuperBar = (props) => {
  function funcToCall (evt) {
    return props.updateCell(evt.target.value, props.cell.cellKey, props.cell.rowIdx)
  }

  if (!props.cell || props.cell.cell.type === 'Images') return (
      <input
        className={cx('InputToSearch')}
        placeholder={'Magic Bar'}
        disabled
      />
  )
  return (
      <input
        className={cx('InputToSearch')}
        value={props.cell ? props.cell.cell.data : ''}
        placeholder={props.cell ? props.cell.cell.data : 'Magic Bar'}
        onChange={funcToCall}
      />
  );
};


export default SuperBar;
