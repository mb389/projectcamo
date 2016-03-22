import React, { Component, PropTypes } from 'react';
import Headers from './Headers';
import Grid from './Grid';
import RowModal from './RowModal';
import AddRow from './AddRow';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

export default class Table extends Component {

  render () {
    if(!this.props.headers) return <div>Loading...</div>
    return (
      <div className={cx('table')}>
        <Headers headers={this.props.headers} />
        <Grid grid={this.props.grid} headers={this.props.headers}/>
        <AddRow />
        <RowModal className={cx('row-modal')}/>
      </div>
    );
  }
}
