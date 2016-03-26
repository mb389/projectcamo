import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/bottom-bar';



const cx = classNames.bind(styles);

function generateColumnReducers (columns) {
  return columns.map((column) => {
      return (
          <span data={column} key={column.id}>{column.name}</span>
          // component of dropdown for reducers;
      )
  })
}

const BottomBar = (props) => {
	console.log('props', props);
  return (
    <div className={cx('BottomBar')} >
      <div>
        <span className={cx('BottomRowCount')}>{props.rows} rows</span>
        {generateColumnReducers(props.columns)}
      </div>
    </div>
  );
};


export default BottomBar;




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
