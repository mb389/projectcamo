import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';
import { connect } from 'react-redux';
import * as Actions from '../../actions/SpaceControls';
import ContentEditable from 'react-contenteditable';


const cx = classNames.bind(styles);


class SheetsTab extends Component {
  constructor(props) {
    super(props);
    this.showSheet = this.showSheet.bind(this);
    this.toggleDisabled = this.toggleDisabled.bind(this);
    this.editSheetName = this.editSheetName.bind(this);
    this.active = 'activeSheet';
    this.state = {disabled: true, name: 'tab'}
  }

  componentWillMount(){
    this.setState({name: this.props.sheet})
  }

  componentWillReceiveProps(nextProps){
    if(this.props.sheets && nextProps.sheet && this.props.sheets.length !== nextProps.sheets.length) this.setState({name:nextProps.sheet})
  }

  showSheet() {
    // check if clicking on the same sheet
    if (!this.active) {
      this.props.dispatch(Actions.saveAllSheets(this.props.sheets, this.props.sheetToShow, this.props.sheetData, this.props.sheetId))
      // might not be a stable solution. But need to wait for new sheet props for inception to work.
      setTimeout(()=> this.props.dispatch(Actions.getSheet(this.props.sheetId, this.props.sheets)), 10);
    }
  }

  editSheetName(e) {
    this.setState({name: e.target.value})
    this.props.dispatch(Actions.changeSheetName(this.props.sheetId, e.target.value));
  }

  toggleDisabled() {
    this.setState({disabled: !this.state.disabled})
  }

  render() {
    this.active = this.props.sheetToShow &&
      this.props.sheetToShow._id === this.props.sheetId ?
      'activeSheet' : '';
    let disabledBool = true;
    return (
      <div onClick={this.active ? null : this.showSheet}
        onDoubleClick={this.toggleDisabled}
        className={cx('SheetTab', 'SheetButton', this.active)}
      >
      <ContentEditable
          html={this.state.name}
            // innerHTML of the editable div
          disabled={this.state.disabled}     // use true to disable edition
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
    sheets: store.spacecontrol.sheets,
    sheetData: store.sheet
  };
}


export default connect(mapStateToProps)(SheetsTab);
