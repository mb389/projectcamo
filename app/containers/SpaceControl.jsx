import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SheetsBar from 'components/spacecontrols/SheetsBar';
import MagicBar from 'components/spacecontrols/MagicBar';
import Table from 'components/Sheet/Table';
import * as Actions from '../actions/spacecontrols';
import * as SheetActions from '../actions/sheet';
import Navigation from 'containers/Navigation';
import BottomBar from 'components/BottomBar/BottomBar';
import ShareModal from 'components/SpaceControls/ShareModal';
import Lookup from 'components/Sheet/Lookup';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';


const cx = classNames.bind(styles);



class SpaceControl extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {searching: false};
    this.runUpdateCell = this.runUpdateCell.bind(this);
    this.toggleMagicBar = this.toggleMagicBar.bind(this);
    this.searchSheet = this.searchSheet.bind(this);
  }

  componentWillMount() {
    if (!this.props.space || !this.props.sheet.grid) {
      this.props.dispatch(Actions.getSpace(this.props.params.spaceId));
    }
  }

  componentWillUnmount(){
    this.props.dispatch(SheetActions.clearSheet())
    this.props.dispatch(SheetActions.clearFilteredRows())
  }

  runUpdateCell(evt, cellKey, rowIdx) {
    this.props.dispatch(SheetActions.updateCell(evt, cellKey, rowIdx, true))
  }

  toggleMagicBar() {
    this.props.dispatch(SheetActions.currentCell())
    if (!!this.props.searching) {
        this.props.dispatch(Actions.searching(false));
        this.props.dispatch(SheetActions.clearFilteredRows())
      } else {
        this.props.dispatch(Actions.searching())
      }
  }

  searchSheet(e) {
    this.props.dispatch(SheetActions.searchSheet(e.target.value))
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
        <MagicBar
          cell={this.props.sheet.currentCell}
          updateCell={this.runUpdateCell}
          toggleMagicBar={this.toggleMagicBar}
          searchSheet={this.searchSheet}
          searching={this.props.searching}
        />
        <ShareModal />
        <Lookup />
      </div>
        <div className={cx('masterControl')}>
          <div className={cx('scrollControl')}>
            <div className={cx('tableBox')}>
              <Table
                grid={this.props.sheet.grid}
                headers={this.props.sheet.columnHeaders}
                searching={this.props.searching}
                filteredRows={this.props.filteredRows}
              />
              <BottomBar grid={this.props.sheet.grid} columns={this.props.sheet.columnHeaders}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



function mapStateToProps(store) {
  return {
    space: store.spacecontrol.space,
    sheet: store.sheet,
    sheetNames: store.spacecontrol.sheetNames,
    searching: store.spacecontrol.searching,
    filteredRows: store.sheet.filteredRows
  };
}

export default connect(mapStateToProps)(SpaceControl);
