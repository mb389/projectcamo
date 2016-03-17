import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Table from 'components/Table';
import styles from 'css/components/vote';

const cx = classNames.bind(styles);

class Vote extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {sheet} = this.props;

    return (
      <div className={cx('vote')}>
        <Table grid={sheet.grid} headers={sheet.columnHeaders}/>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sheet: store.sheet
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps)(Vote);
