import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SheetsBar from 'components/SpaceControls/SheetsBar';
import MagicBar from 'components/SpaceControls/MagicBar';
import Table from 'components/Sheet/Table';
import * as Actions from '../actions/spacecontrols';
import Navigation from 'containers/Navigation';


class SpaceControl extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if (!this.props.space) {
      this.props.dispatch(Actions.getSpace());
    }
  }

  render() {
    return (
        <div>
          <Navigation space={this.props.space} />
        <SheetsBar sheetToShow={this.props.sheetToShow}
            space={this.props.space}
            sheetNames={this.props.sheetNames}
          />
          <MagicBar />
          <Table grid={this.props.sheet.grid} headers={this.props.sheet.columnHeaders} />
        </div>
    );
  }
}





function mapStateToProps(store) {
  return {
    space: store.space,
    sheet: store.sheet,
    sheetNames: store.sheetNames
  };
}

export default connect(mapStateToProps)(SpaceControl);
