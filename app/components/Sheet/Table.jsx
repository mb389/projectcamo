import React from 'react';
import Headers from './Headers';
import Grid from './Grid';
import RowModal from './RowModal';
import AddRow from './AddRow';
import MapContainer from 'containers/MapContainer';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

const Table = (props) => {
  if (!props.headers) return <div>Loading...</div>;
  return (
    <div className={cx('table')}>
      <Headers headers={props.headers} resizeCol={props.resizeCol} dragCol={props.dragCol} />
      <Grid
        grid={props.grid}
        headers={props.headers}
        disableAll={props.disableAll}
        searching={props.searching}
        filteredRows={props.filteredRows}
      />
      <AddRow />
      <RowModal className={cx('row-modal')} />
      <MapContainer />
    </div>
  );
};

export default Table;
