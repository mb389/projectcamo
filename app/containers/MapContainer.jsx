import React, {Component} from 'react';
import {connect} from 'react-redux';
import {closeMap, getLatLongs} from 'actions/sheet';
import MapModal from 'components/Sheet/Map/MapModal';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addressData && !nextProps.mapMarkersData)
      this.props.dispatch(getLatLongs(nextProps.addressData));
  }

  close() {
    this.props.dispatch(closeMap());
  }

  render() {
    return (
      <MapModal
        markers={this.props.mapMarkersData}
        mapName={this.props.mapName}
        showMap={this.props.showMap}
        close={this.close}
      />
    );
  }
}

function mapStateToProps(store) {
  return {
    showMap: store.sheet.showMap,
    addressData: store.sheet.addressData,
    mapMarkersData: store.sheet.mapMarkersData,
    mapName: store.sheet.mapColumn,
  };
}

export default connect(mapStateToProps)(MapContainer);
