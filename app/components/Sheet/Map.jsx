import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/map';

const cx = classNames.bind(styles);


const Map = (props) => {
  console.log('map props', props);
  return (
    <div className={cx('Map')}>
      <Modal show={props.showMap} onHide={props.close}>
      <Modal.Header className={cx('shareModalHeader')} classcloseButton>
        <Modal.Title>Sharing Dashboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.close}>Close</Button>
      </Modal.Footer>
      </Modal>
    </div>
  );
};


export default Map;
