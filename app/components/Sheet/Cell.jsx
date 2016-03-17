import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

export default class Cell extends Component {

  render () {

    return (
       <div className={cx('cell')} key={this.props.key}>
        {this.props.cell.data}
       </div>
    );
  }
}

