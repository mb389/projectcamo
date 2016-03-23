import React, { PropTypes, Component } from 'react';
import SearchButton from './SearchButton';
import ShareButton from './ShareButton';
import SaveButton from './SaveButton';
import HistoryButton from './HistoryButton';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';


const cx = classNames.bind(styles);

const SuperBar = (props) => {
  console.log(props);
  function funcToCall (evt) {
    return props.updateCell(evt.target.value, props.cell.cellKey, props.cell.rowIdx)
  }

  if (!props) return <div className={cx('SuperBar')} ></div>
  return (
    <div className={cx('SuperBar')} >
      <input
        className={cx('InputToSearch')}
        value={props.cell ? props.cell.cell.data : ''}
        placeholder={props.cell ? props.cell.cell.data : 'Magic Bar'}
        onChange={funcToCall}
      />
    </div>
  );
};


export default SuperBar;
