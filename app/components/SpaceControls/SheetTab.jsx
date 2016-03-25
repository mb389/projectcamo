import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';
import { connect } from 'react-redux';
import * as Actions from '../../actions/spacecontrols';
import ContentEditable from 'react-contenteditable';


const cx = classNames.bind(styles);


class SheetsTab extends Component {
  constructor(props) {
    super(props);
    this.showSheet = this.showSheet.bind(this);
    this.toggleDisabled = this.toggleDisabled.bind(this);
    this.editSheetName = this.editSheetName.bind(this);
    this.active = 'activeSheet';
    this.disabledBool = true;
  }

  showSheet() {
    this.props.dispatch(Actions.getSheet(this.props.sheetId, this.props.sheets));
  }

  editSheetName(e) {
    this.props.dispatch(Actions.changeSheetName(this.props.sheetId, e.target.value));
  }

  toggleDisabled() {
    this.disabledBool = !this.disabledBool;
  }

  render() {
    this.active = this.props.sheetToShow &&
      this.props.sheetToShow._id === this.props.sheetId ?
      'activeSheet' : '';
    let disabledBool = true;
    return (
      <div onClick={this.showSheet}
        onDoubleClick={this.toggleDisabled}
        className={cx('SheetTab', 'SheetButton', this.active)}
      >
      <ContentEditable
          html={this.props.sheet}
            // innerHTML of the editable div
          disabled={this.disabledBool}     // use true to disable edition
          onChange={this.editSheetName} // handle innerHTML change
        />
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    space: store.spacecontrol.space,
    sheetToShow: store.spacecontrol.sheetToShow,
    sheets: store.spacecontrol.sheets
  };
}


export default connect(mapStateToProps)(SheetsTab);
