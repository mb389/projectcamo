import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';
import * as Actions from '../../actions/SpaceControls';

const cx = classNames.bind(styles);

class AddSheetButton extends Component {
  constructor(props) {
    super(props);
    this.addSheet = this.addSheet.bind(this);
  }

  addSheet() {
    this.props.dispatch(Actions.addSheet(this.props.space._id));
  }

  render() {
    return (
      <button className={cx('AddSheetButton', 'SheetButton')} onClick={this.addSheet}>+</button>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    space: store.spacecontrol.space,
  };
};

export default connect(mapStateToProps)(AddSheetButton);
