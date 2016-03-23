import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from 'css/components/modal';
import { Modal, Popover, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { closeShareModal } from 'actions/spacecontrols';


const cx = classNames.bind(styles);

class ShareModal extends Component {
  constructor(props, state){
		super(props, state)
    this.close = this.close.bind(this);
	}

  close() {
    this.props.dispatch(closeShareModal())
  }

    render(){
      let popover = <Popover title="popover">very popover. such engagement</Popover>;
      let tooltip = <Tooltip>wow.</Tooltip>;
      return (
        // <div className={cx('shareModal')}>
                  <Modal show={this.props.showShareModal} onHide={this.close}>
                    <Modal.Header closeButton>
                      <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h4>Text in a modal</h4>
                      <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                      <h4>Popover in a modal</h4>
                      <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

                      <h4>Tooltips in a modal</h4>
                      <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

                      <hr />

                      <h4>Overflowing text to show scroll behavior</h4>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                // </div>

      );
   	}

}

function mapStateToProps(store) {
  return {
    showShareModal: store.spacecontrol.showShareModal
  };
}

export default connect(mapStateToProps)(ShareModal);
