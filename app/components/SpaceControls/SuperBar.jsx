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

  // Being used as search
  if (props.searching && !props.cell) {
    return (
      <input
        placeholder={'Search your sheet'}
        onChange={props.searchSheet}
      />
    )
  }

  // If no cell or image then disabled and says Magic Bar
  if (!props.cell || props.cell.cell.type  === 'Images' || props.cell.cell.type  === 'Reference') return (
      <input
        placeholder={'Magic Bar'}
        onChange={props.searchSheet}
        disabled
      />
  )

  function keyPress (evt) {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        return props.enterPress(evt.keyCode);
      }
    }

  // standard when cell is selected is populates the magic bar and is linked with the cell
  return (
      <input
        value={props.cell ? props.cell.cell.data : 'Magic Bar'}
        placeholder={props.cell ? props.cell.cell.data : 'Magic Bar'}
        onChange={funcToCall}
        onKeyDown={keyPress}
      />
  );
};


export default SuperBar;
