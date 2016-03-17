import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

export default class Headers extends Component {

  render () {
    const headers = this.props.headers.map((header, key) => {
      return (
        <div className={cx('theaders')} key={key}>
            {header.name}
        </div>
      )
    })

    return (
        <div className={cx('theaders')}>
          {headers}
        </div>
    );
  }
}

