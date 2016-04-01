import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/map';
import GoogleMap from 'components/Sheet/GoogleMap';

const cx = classNames.bind(styles);


const MapModal = (props) => {
  console.log(props)
  return (
      <Modal className={cx('Map')} show={props.showMap} onHide={props.close} bsSize="lg">
        <Modal.Header className={cx('mapHeader')} classcloseButton>
          <Modal.Title>{props.mapName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GoogleMap {...props} />
        </Modal.Body>
      </Modal>
  );
};


export default MapModal;
