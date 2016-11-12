import React, { Component } from 'react';
import { Gmaps, Marker } from 'react-gmaps';
import classNames from 'classnames/bind';
import styles from 'css/components/map';

const cx = classNames.bind(styles);

// const coords = {
//   lat: 51.5258541,
//   lng: -0.08040660000006028
// };

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = { markersCreated: false, markers: [], zoom: 12, midPoint: [] };
    this.createMarkers = this.createMarkers.bind(this);
    this.markerCoordRangeFinder = this.markerCoordRangeFinder.bind(this);
    this.findZoomFromRanges = this.findZoomFromRanges.bind(this);
  }

  componentWillMount() {
    if (!this.props.markers) return;
    this.createMarkers(this.props.markers);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.markers && nextProps.markers !== this.props.markers) {
      this.createMarkers(nextProps.markers);
    }
  }

  markerCoordRangeFinder(foundMarkers) {
    if (foundMarkers.length === 1) foundMarkers.push(foundMarkers[0]);
    return foundMarkers.reduce((accum, mrk) => {
      if (accum.length === 0) accum = [mrk.loc.lat, mrk.loc.lat, mrk.loc.lng, mrk.loc.lng];
      if (mrk.loc.lat > accum[0]) accum[0] = mrk.loc.lat;
      if (mrk.loc.lat < accum[1]) accum[1] = mrk.loc.lat;
      if (mrk.loc.lng > accum[2]) accum[2] = mrk.loc.lng;
      if (mrk.loc.lng < accum[3]) accum[3] = mrk.loc.lng;
      return accum;
    }, []);
  }

  findZoomFromRanges(ranges) {
    let zoom = 21 - Math.ceil(Math.log(Math.max(...ranges) / 0.0005) / Math.log(2));
    return zoom > 13 ? Math.min(zoom--, 20) : zoom;
  }

  createMarkers(markers) {
    const markersToAdd = markers.map((mrk, i) => (
      <Marker
        key={i}
        lat={mrk.loc.lat}
        lng={mrk.loc.lng}
        label={String(i + 1)}
        title={mrk.name}
      />
    ));

    // manually calculating zoom for map
    // find the furthest coords for all places
    const ranges = this.markerCoordRangeFinder(markers);
    // midpoint of the view
    const midPoint = [(ranges[0] + ranges[1]) / 2, (ranges[2] + ranges[3]) / 2];
    const latLongRanges = [ranges[0] - ranges[1], ranges[2] - ranges[3]];
    // zoom of the view
    const zoom = this.findZoomFromRanges(latLongRanges);
    this.setState({ markersCreated: true, markers: markersToAdd, midPoint, zoom });
  }

  render() {
    if (this.state.markersCreated) {
      return (
        <Gmaps width={'750px'}
          height={'600px'}
          lat={this.state.midPoint[0]}
          lng={this.state.midPoint[1]}
          zoom={this.state.zoom}
          loadingMessage={'Your map is loading'}
          params={{ v: '3.exp' }}
          className={cx('mapPlugIn')}
        >
          {this.state.markers}
        </Gmaps>
      );
    }
    return <div>Map Loading</div>;
  }
}

export default GoogleMap;
