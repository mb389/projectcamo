import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/map';
import GMaps from 'gmaps';

const cx = classNames.bind(styles);

const coords = {
  lat: 40.705189,
  lng: -74.009209
};

const coords2 = {
  lat: 40.735975,
  lng: -73.990394
}

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.onMapCreated = this.onMapCreated.bind(this);
  }


  onMapCreated(map) {

  }

  componentsWillMount() {
    // create markers
    // GMaps.geocode({
    //   address: 'Westport, CT',
    //   callback: function(results, status) {
    //     if (status == 'OK') {
    //       let latlng = results[0].geometry.location;
    //       let coords3 = {
    //         lat: latlng.lat(),
    //         lng: latlng.lng()
    //       };
    //     }
    //   }
    // });
  }


  render() {
    return (
      <Gmaps width={'650px'}
        height={'500px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}
        loadingMessage={'Your map is loading'}
        params={{v: '3.exp'}}
        onMapCreated={this.onMapCreated}
        className={cx('mapPlugIn')}
      >
      <Marker
        lat={coords.lat}
        lng={coords.lng}
        draggable={false}
        onDragEnd={this.onDragEnd} />
        <Marker
          lat={coords2.lat}
          lng={coords2.lng}
          draggable={false}
          onDragEnd={this.onDragEnd} />
    </Gmaps>
    );
  }
}



export default GoogleMap;
