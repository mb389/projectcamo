import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { closeMap } from '../actions/sheet';
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

  render() {
    console.log('map container props', this.props)
    return (
        <MapModal showMap={this.props.showMap} close={this.close}/>
    );
  }
}



function mapStateToProps(store) {
  return {
    showMap: store.sheet.showMap
  };
}

export default connect(mapStateToProps)(MapContainer);
