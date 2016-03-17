import React, { Component, PropTypes } from 'react';
import Headers from './Headers';
import Grid from './Grid';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

export default class Table extends Component {

  render () {
    console.log(this.props.grid)
    console.log(this.props.headers)

    return (
      <div className={cx('table')}>
        <Headers headers={this.props.headers} />
        <Grid grid={this.props.grid}/>
      </div>
    );
  }
}

