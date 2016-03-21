import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SheetsBar from 'components/SpaceControls/SheetsBar';
import MagicBar from 'components/SpaceControls/MagicBar';
import Table from 'components/Sheet/Table';
import * as Actions from '../actions/spacecontrols';
import Navigation from 'containers/Navigation';
import BottomBar from 'components/BottomBar';

import classNames from 'classnames/bind';
import styles from 'css/components/space-control';


const cx = classNames.bind(styles);




class SpaceControl extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if (!this.props.space) {
      this.props.dispatch(Actions.getSpace(this.props.params.spaceId));
    }
  }

  render() {
    return (
      <div className={cx('SpaceControl')}>
        <div className={cx('ControlBar')}>
          <Navigation space={this.props.space} />
          <SheetsBar sheetToShow={this.props.sheetToShow}
            space={this.props.space}
            sheetNames={this.props.sheetNames}
          />
          <MagicBar />
      </div>
        <div className={cx('tableBox')}>
          <Table grid={this.props.sheet.grid}
            headers={this.props.sheet.columnHeaders}
          />
        </div>
        <BottomBar />
      </div>
    );
  }
}



function mapStateToProps(store) {
  return {
    space: store.spacecontrol.space,
    sheet: store.sheet,
    sheetNames: store.spacecontrol.sheetNames
  };
}

export default connect(mapStateToProps)(SpaceControl);
