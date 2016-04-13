import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SheetsBar from 'components/SpaceControls/SheetsBar';
import MagicBar from 'components/SpaceControls/MagicBar';
import Table from 'components/Sheet/Table';
import * as Actions from '../actions/SpaceControls';
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
    this.superMoveCell = this.superMoveCell.bind(this);
    this.toggleMagicBar = this.toggleMagicBar.bind(this);
    this.searchSheet = this.searchSheet.bind(this);
    this.resizeCol = this.resizeCol.bind(this);
    this.dragCol = this.dragCol.bind(this);
    this.deleteSheet = this.deleteSheet.bind(this);
  }

  componentWillMount() {
    if (!this.props.space || !this.props.sheet.grid) {
      this.props.dispatch(Actions.getSpace(this.props.params.spaceId));
    }
  }

  componentWillUnmount(){
    this.props.dispatch(SheetActions.clearSheet());
    this.props.dispatch(SheetActions.clearFilteredRows());
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.sheetNames && this.props.sheetNames && nextProps.sheetNames.length !== this.props.sheetNames.length) this.forceUpdate()
  }

  runUpdateCell(evt, cellKey, rowIdx) {
    this.props.dispatch(SheetActions.updateCell(evt, cellKey, rowIdx, true));
  }

  superMoveCell(keyCode) {
    this.props.dispatch(SheetActions.moveToCell(keyCode));
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

  resizeCol(e) {
    this.props.dispatch(SheetActions.resizeCol(e))
  }

  dragCol(e) {
    this.props.dispatch(SheetActions.dragCol(e))
  }

  searchSheet(e) {
    this.props.dispatch(SheetActions.searchSheet(e.target.value))
  }

  deleteSheet() {
    this.props.dispatch(Actions.deleteSheet(this.props.sheetToShow._id, this.props.sheets, this.props.space._id))
  }

  render() {
    if (!this.props.sheet || !this.props.sheet.grid) return <div>loading ...</div>
    return (
      <div className={cx('SpaceControl')}>
        <div className={cx('ControlBar')}>
          <Navigation space={this.props.space} />
          <SheetsBar
            sheetToShow={this.props.sheetToShow}
            space={this.props.space}
            sheetNames={this.props.sheetNames}
          />
        <MagicBar
          cell={this.props.sheet.currentCell}
          updateCell={this.runUpdateCell}
          enterPress={this.superMoveCell}
          toggleMagicBar={this.toggleMagicBar}
          searchSheet={this.searchSheet}
          searching={this.props.searching}
          deleteSheet={this.deleteSheet}
        />
      <ShareModal space={this.props.space} />
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
                resizeCol={this.resizeCol}
                dragCol={this.dragCol}
              />
            </div>
          </div>
        </div>
        <BottomBar grid={this.props.sheet.grid} columns={this.props.sheet.columnHeaders}/>
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
    filteredRows: store.sheet.filteredRows,
    sheets: store.spacecontrol.sheets,
    sheetToShow: store.spacecontrol.sheetToShow
  };
}

export default connect(mapStateToProps)(SpaceControl);
