import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/bottom-bar';



const cx = classNames.bind(styles);

function generateColumnReducers (columns) {
  return columns.map((column) => {
      return (
          <BottomReducers column={column} key={column.id}/>
          // component of dropdown for reducers;
      )
  })
}

const BottomBar = (props) => {
	console.log('props', props);
  return (
    <div className={cx('BottomBar')} >
      <div className={cx('BottomRowCount')}>
        <span >{props.rows} rows</span>
      </div>
        {generateColumnReducers(props.columns)}
    </div>
  );
};


export default BottomBar;


const BottomReducers = (props) => {
	return (
		<div className={cx('BottomReducers')} key={props.column.id}>{props.column.name}</div>
		)
}




// const Headers = (props) => {
//   return (
//       <div className={cx('theaders')}>
//         <div className={cx('topCorner')} />
//         <div className={cx('topCorner')}></div>
//         {generateColumnOptions(props.headers)}
//         <AddColumn />
//       </div>
//     );
// }
