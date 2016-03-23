import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from 'css/components/modal';
import { Modal, Glyphicon, Input, Popover, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
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
      let addBtn = <Button className={cx('addBtn')}><Glyphicon glyph='plus' /></Button>;
      return (
        <div className={cx('shareModal')}>
            <Modal show={this.props.showShareModal} onHide={this.close}>
              <Modal.Header className={cx('shareModalHeader')} classcloseButton>
                <Modal.Title>Sharing Dashboard</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Collaborators</h4>
                <div className='col-sm-3'>
                <div className={cx('userImg')}></div>
                <p>User A</p></div>
                <div className='col-sm-3'>
                <div className={cx('userImg')}></div>
                <p>User B</p></div>
                <div className='col-sm-3'>
                <div className={cx('userImg')}></div>
                <p>User C</p></div>
                <div className='col-sm-3'>
                <div className={cx('userImg')}></div>
                <p>User D</p></div>
                <hr/>
                <div>Invite Others</div>
                <form>
                  <Input type='text' placeholder='Enter e-mail' buttonAfter={addBtn} />
                </form>

                <hr />
                <h4>Link Sharing</h4>
                <p>Share as read-only</p>
                <hr/>
                <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>
                <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>

      );
   	}

}

function mapStateToProps(store) {
  return {
    showShareModal: store.spacecontrol.showShareModal
  };
}

export default connect(mapStateToProps)(ShareModal);
