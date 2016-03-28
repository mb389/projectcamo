import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import { Gmaps, Marker, InfoWindow, Circle } from 'react-gmaps';
import { getLatLongs } from 'actions/sheet';
import { Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/map';

const cx = classNames.bind(styles);

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {markersCreated: false, markers: []}
  }

  componentWillMount() {
      let markersToAdd = this.props.markers.map((mrk,i) => {
        return (
          <Marker
            key={i}
            lat={mrk.loc.lat}
            lng={mrk.loc.lng}
            label={String(i+1)}
            title={mrk.name}
            />
        )
      })
      this.setState({markersCreated: true, markers: markersToAdd})
  }

  render() {
    if(this.state.markersCreated) {
      return (
        <Gmaps width={'750px'}
          height={'600px'}
          lat={this.props.markers[0].loc.lat}
          lng={this.props.markers[0].loc.lng}
          zoom={11}
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
