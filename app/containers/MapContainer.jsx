import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/SpaceControls';
import { Modal } from 'react-bootstrap';
import { closeMap, getLatLongs } from 'actions/sheet';
import MapModal from 'components/Sheet/Map/MapModal';
import classNames from 'classnames/bind';


class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  close() {
    this.props.dispatch(closeMap())
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.addressData && !nextProps.mapMarkersData) this.props.dispatch(getLatLongs(nextProps.addressData));
  }


  render() {
    return (
        <MapModal markers={this.props.mapMarkersData} mapName={this.props.mapName} showMap={this.props.showMap} close={this.close}/>
    );
  }
}



function mapStateToProps(store) {
  return {
    showMap: store.sheet.get('showMap'),
    addressData: store.sheet.get('addressData'),
    mapMarkersData: store.sheet.get('mapMarkersData'),
    mapName: store.sheet.get('mapColumn')
  };
}

export default connect(mapStateToProps)(MapContainer);
