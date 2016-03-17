import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SheetsBar from 'components/SpaceControls/SheetsBar';
import MagicBar from 'components/SpaceControls/MagicBar';
import Table from 'components/Sheet/Table';


class SpaceControl extends Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
        <div>
          <SheetsBar space={this.props.space}/>
          <MagicBar />
          <Table grid={this.props.sheet.grid} headers={this.props.sheet.columnHeaders}/>
        </div>
    );
  }
}





function mapStateToProps(store) {
  return {
    space: store.space,
    sheet: store.sheet
  };
}

export default connect(mapStateToProps)(SpaceControl);
