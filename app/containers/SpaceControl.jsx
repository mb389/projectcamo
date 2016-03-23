import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SheetsBar from 'components/spacecontrols/SheetsBar';
import MagicBar from 'components/spacecontrols/MagicBar';
import Table from 'components/Sheet/Table';
import * as Actions from '../actions/spacecontrols';
import * as SheetActions from '../actions/sheet';
import Navigation from 'containers/Navigation';
import BottomBar from 'components/BottomBar';
import ShareModal from 'components/SpaceControls/ShareModal';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';


const cx = classNames.bind(styles);


class SpaceControl extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if (!this.props.space || !this.props.sheet.grid) {
      this.props.dispatch(Actions.getSpace(this.props.params.spaceId));
    }
  }

  componentWillUnmount(){
    this.props.dispatch(SheetActions.clearSheet())
  }

  render() {
    if (!this.props.sheet || !this.props.sheet.grid) return <div>loading ...</div>
    return (
      <div className={cx('SpaceControl')}>
        <div className={cx('ControlBar')}>
          <Navigation space={this.props.space} />
          <SheetsBar sheetToShow={this.props.sheetToShow}
            space={this.props.space}
            sheetNames={this.props.sheetNames}
          />
          <MagicBar />

            <ShareModal />
      </div>
        <div className={cx('masterControl')}>
          <div className={cx('scrollControl')}>
            <div className={cx('tableBox')}>
              <Table grid={this.props.sheet.grid}
                headers={this.props.sheet.columnHeaders}
              />
            </div>
          </div>
        </div>
        <BottomBar rows={this.props.sheet.grid.length}/>
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
