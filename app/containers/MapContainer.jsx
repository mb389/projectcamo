import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/SpaceControls';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';


const cx = classNames.bind(styles);



class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.dispatch(closeMap())
  }

  render() {
    return (
      <Modal show={this.props.showMap} onHide={this.close}>
        <Map />
      </Modal>
    );
  }
}



function mapStateToProps(store) {
  return {
    showMap: store.sheet.showMap
  };
}

export default connect(mapStateToProps)(MapContainer);
