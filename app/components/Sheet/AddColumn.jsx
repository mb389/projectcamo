import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { addColumn } from 'actions/sheet';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

class AddColumn extends Component {
  constructor(props, state) {
    super(props, state);
    this.addColumn = this.addColumn.bind(this);
  }

  addColumn() {
    this.props.dispatch(addColumn());
  }

  render() {
    return (
      <button
        className={cx('addColumn') }
        style={{ marginLeft: this.props.margin }}
        onClick={this.addColumn}
      > +
      </button>
    );
  }
}

export default connect()(AddColumn);

