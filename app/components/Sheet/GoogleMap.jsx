import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { getLatLongs } from 'actions/sheet';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/map';
// import GMaps from 'gmaps';

const cx = classNames.bind(styles);


// let coordSet = [{
//             lat: 40.705189,
//             lng: -74.009209
//             },
//             {
//               lat: 40.735975,
//               lng: -73.990394
//             },
//             {
//               lat: 40.745975,
//               lng: -73.970394
//             }]

// const createMarkers = (markers) => coordSet.map((coord,i) => {
//       return (
//         <Marker
//           key={i}
//           lat={coord.lat}
//           lng={coord.lng}
//           label={String(i+1)}
//           title={'Title'}
//         />
//       )
// })

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {markersCreated: false, markers: []}
    this.onMapCreated = this.onMapCreated.bind(this);
  }

  componentWillMount() {
    let markersToAdd = this.props.markers.map((coord,i) => {
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
    this.setState({markersCreated: true, markers: markersToAdd})
  }

  onMapCreated(map) {
    console.dir('map created', map)
  }

  // componentWillReceiveProps() {
  //   createMarkers(this.props.markers)
  // }


  render() {
    console.log(this.props.markers);
    if(this.state.markersCreated) {
      return (
        <Gmaps width={'650px'}
          height={'500px'}
          lat={this.props.markers[0].lat}
          lng={this.props.markers[0].lng}
          zoom={12}
          loadingMessage={'Your map is loading'}
          params={{v: '3.exp'}}
          onMapCreated={this.onMapCreated}
          className={cx('mapPlugIn')}
        >
        {this.state.markers}
      </Gmaps>
    )
    } else {
      return <div>Map Loading</div>
    }
  }
}

export default GoogleMap;
