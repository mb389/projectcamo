import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/bottom-bar';
import BottomReducers from './BottomReducers';

const cx = classNames.bind(styles);

const BottomBar = (props) => {
  
  let columnData = {}
  props.grid.forEach(function(row){
  	for (let columnId in row){
  		if (!columnData[columnId]) columnData[columnId] = [];
  		if (row[columnId].data) columnData[columnId].push(row[columnId].data);
  	}
  })

  function generateColumnReducers (columns) {
	  return columns.map((column) => {
	      return (
	          <BottomReducers columnData={columnData[column.id]} columnType={props.grid.length ? props.grid[0][column.id].type : 'Text'} key={column.id} width={column.width}/>
	          // component of dropdown for reducers column has id, idx, name, type;
	      )
	  })
	}
return (
    <div className={cx('BottomBar')} >
      <div className={cx('BottomRowCount')}>
        <text className={cx('BottomRowCountSpan')}>{props.grid.length} rows</text>
      </div>
        {generateColumnReducers(props.columns)}
    </div>
  );
};


export default BottomBar;
