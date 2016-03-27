import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { closeMap } from '../actions/sheet';
import { Modal } from 'react-bootstrap';
import Map from 'components/Sheet/Map';
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
    console.log('map container props', this.props)
    return (
        <Map showMap={this.props.showMap} close={this.close}/>
    );
  }
}



function mapStateToProps(store) {
  return {
    showMap: store.sheet.showMap
  };
}

export default connect(mapStateToProps)(MapContainer);
