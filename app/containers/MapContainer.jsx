import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/SpaceControls';
import { Modal } from 'react-bootstrap';
import { closeMap, getLatLongs } from 'actions/sheet';
import MapModal from 'components/Sheet/MapModal';
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
    // check if props are a column - send a message that says its a column
    if(nextProps.addressData && !nextProps.mapMarkersData) {
      // if(!this.props.addressData || this.props.addressData.filter(item => item ? true : false).length !== nextProps.addressData.filter(item => item ? true : false).length)
      this.props.dispatch(getLatLongs(nextProps.addressData));
    }
  }


  render() {
    console.log('map container props', this.props)
    return (
        <MapModal markers={this.props.mapMarkersData} mapName={this.props.mapName} showMap={this.props.showMap} close={this.close}/>
    );
  }
}



function mapStateToProps(store) {
  return {
    showMap: store.sheet.showMap,
    addressData: store.sheet.addressData,
    mapMarkersData: store.sheet.mapMarkersData,
    mapName: store.sheet.mapColumn
  };
}

export default connect(mapStateToProps)(MapContainer);
