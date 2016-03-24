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
    this.state = {searching: false};
    this.runUpdateCell = this.runUpdateCell.bind(this);
    this.toggleMagicBar = this.toggleMagicBar.bind(this);
    this.searchSheet = this.searchSheet.bind(this);
    this.stopSearching = this.stopSearching.bind(this);
  }

  componentWillMount() {
    if (!this.props.space || !this.props.sheet.grid) {
      this.props.dispatch(Actions.getSpace(this.props.params.spaceId));
    }
  }

  componentWillUnmount(){
    this.props.dispatch(SheetActions.clearSheet())
  }

  runUpdateCell(evt, cellKey, rowIdx) {
    this.props.dispatch(SheetActions.updateCell(evt, cellKey, rowIdx))
  }

  toggleMagicBar() {
    console.log(this.props.searching)
    this.props.dispatch(SheetActions.currentCell())
    if (!!this.props.searching) {
        this.props.dispatch(Actions.searching(false));
        this.props.dispatch(SheetActions.clearSearchGrid());
      } else {
        this.props.dispatch(Actions.searching())
      }
  }

  searchSheet(e) {
    console.log(e.target)
    // filters the rows for cells that match the current search criteria
    this.props.dispatch(SheetActions.searchSheet(e.target.value))
    if (e.target) {
      !e.target.value ?
        null :
        null;
    }
  }

  stopSearching() {
    this.props.dispatch(Actions.searching(false))
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
          stopSearching={this.props.stopSearching}
        />
        <ShareModal />
      </div>
        <div className={cx('masterControl')}>
          <div className={cx('scrollControl')}>
            <div className={cx('tableBox')}>
              <Table
                grid={this.props.searching && this.props.searchGrid ? this.props.searchGrid : this.props.sheet.grid}
                headers={this.props.sheet.columnHeaders}
                searching={this.props.searching}
                filteredRows={this.props.filteredRows}
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
    sheetNames: store.spacecontrol.sheetNames,
    searching: store.spacecontrol.searching,
    searchGrid: store.sheet.searchGrid,
    filteredRows: store.sheet.filteredRows
  };
}

export default connect(mapStateToProps)(SpaceControl);
