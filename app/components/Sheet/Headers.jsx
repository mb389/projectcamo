import React, { Component, PropTypes } from 'react';
import ColumnOptions from './ColumnOptions';
import AddColumn from './AddColumn';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import {Pane,SortablePane} from 'react-sortable-pane'

const cx = classNames.bind(styles);

function generateColumnOptions (headers) {
  return headers.map((header) => {
      return (
        <Pane
        className={cx('thead')}
        id={header.id}
        key={header.id}
        width={header.width||200}
        height={34}>
        <ColumnOptions data={header} key={header.id}/>
        </Pane>
      )
  })
}

function findAddMargin (headers) {

  let margin = headers.reduce((accum, header) => {
    return accum + header.width;
  }, 0);

  return margin;
};

const Headers = (props) => {
  
  return (
      <div className={cx('theaders')}>
        <div className={cx('topCorner')} />
        <div className={cx('topCorner')}></div>
        <SortablePane
           direction="horizontal"
           margin={0}
           disableEffect={true}
           onResize={(id, dir, size, rect) => props.resizeCol(id)}
           onOrderChange={(oldPanes,newPanes) => {
            //  let bounced=_.debounce(() => props.dragCol(newPanes),500);
            //  bounced();
           }}
           >
            {generateColumnOptions(props.headers)}
        </SortablePane>


        <AddColumn margin={findAddMargin(props.headers)}/>
      </div>
    );
}

export default Headers;
