import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import SheetsBar from 'components/SpaceControls/SheetsBar';
import MagicBar from 'components/SpaceControls/MagicBar';
import Table from 'components/Table';


class SpaceControl extends Component {
  constructor(props, context) {
    super(props, context);

  }

  render() {
    return (
        <div>
          <SheetsBar space={this.props.space}/>
          <MagicBar />
          <Table />
        </div>
    );
  }
}





function mapStateToProps(store) {
  return {
    space: store.space
  };
}

export default connect(mapStateToProps)(SpaceControl);
