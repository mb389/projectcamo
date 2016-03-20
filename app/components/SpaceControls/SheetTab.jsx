import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';
import { connect } from 'react-redux';
import * as Actions from '../../actions/spacecontrols';


const cx = classNames.bind(styles);


class SheetsTab extends Component {
  constructor(props) {
    super(props);
    this.showSheet = this.showSheet.bind(this);
    this.active = 'activeSheet';
  }

  showSheet() {
    this.props.dispatch(Actions.getSheet(this.props.spaceId, this.props.sheet));
  }

  render() {
    this.active = this.props.sheetToShow &&
      this.props.sheetToShow.name === this.props.sheet ?
      'activeSheet' : '';
    return (
      <div onClick={this.showSheet}
        className={cx('SheetTab', 'SheetButton', this.active)}
      >{this.props.sheet}</div>
    );
  }
}

function mapStateToProps(store) {
  return {
    space: store.spacecontrol.space,
    sheetToShow: store.spacecontrol.sheetToShow
  };
}


export default connect(mapStateToProps)(SheetsTab);
