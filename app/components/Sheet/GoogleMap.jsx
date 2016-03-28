import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { getLatLongs } from 'actions/sheet';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/map';
// import GMaps from 'gmaps';

const cx = classNames.bind(styles);


let coordSet = [{
            lat: 40.705189,
            lng: -74.009209
            },
            {
              lat: 40.735975,
              lng: -73.990394
            },
            {
              lat: 40.745975,
              lng: -73.970394
            }]

const markers = coordSet.map((coord,i) => {
      return (
        <Marker
          key={i}
          lat={coord.lat}
          lng={coord.lng}
          label={String(i+1)}
          title={'Title'}
        />
      )
})

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.onMapCreated = this.onMapCreated.bind(this);
  }




  onMapCreated(map) {
    console.dir(map)
  //   GMaps.geocode({
  //   address: 'Westport, CT',
  //   callback: function(results, status) {
  //     if (status == 'OK') {
  //       console.log('results', results)
  //       let latlng = results[0].geometry.location;
  //       // map.setCenter(latlng.lat(), latlng.lng());
  //       markers.push(
  //         <Marker
  //           lat={latlng.lat()}
  //           lng={latlng.lng()}
  //         />
  //       )
  //     }
  //   }
  // });
  }


  render() {
    console.log(markers);
    return (
      <Gmaps width={'650px'}
        height={'500px'}
        lat={coordSet[0].lat}
        lng={coordSet[0].lng}
        zoom={12}
        loadingMessage={'Your map is loading'}
        params={{v: '3.exp'}}
        onMapCreated={this.onMapCreated}
        className={cx('mapPlugIn')}
      >
      {markers}
    </Gmaps>
    );
  }
}

export default GoogleMap;
