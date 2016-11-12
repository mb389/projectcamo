import React from 'react';
import ColumnOptions from './ColumnOptions';
import AddColumn from './AddColumn';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { Pane, SortablePane } from '../SortablePane';

const cx = classNames.bind(styles);

function generateColumnOptions(headers) {
  return headers.map((header) => (
    <Pane
      className={cx('thead')}
      id={header.id}
      key={header.id}
      width={header.width || 200}
      height={34}
    >
      <ColumnOptions data={header} key={header.id} />
    </Pane>
  ));
}

function findAddMargin(headers) {
  const totColWidth = headers.reduce((accum, header) => accum + header.width, 0);
  return totColWidth;
}

const Headers = (props) => (
  <div className={cx('theaders')}>
    <div className={cx('topCorner')} />
    <div className={cx('topCorner')}></div>
    <SortablePane
      direction="horizontal"
      margin={0}
      disableEffect
      onResize={(id) => props.resizeCol(id)}
    >
      {generateColumnOptions(props.headers)}
    </SortablePane>
    <AddColumn margin={findAddMargin(props.headers)} />
  </div>
);

export default Headers;
