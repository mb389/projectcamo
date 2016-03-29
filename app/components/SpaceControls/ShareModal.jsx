import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from 'css/components/modal';
import { Modal, Glyphicon, Input, Popover, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { closeShareModal } from 'actions/SpaceControls';
import * as DashActions from 'actions/dashboard';
import ShareModalCollabs from './ShareModalCollabs';

const cx = classNames.bind(styles);

class ShareModal extends Component {
  constructor(props, state){
		super(props, state)
    this.close = this.close.bind(this);
    this.newCollab = this.newCollab.bind(this);
    this.handleChange = this.handleChange.bind(this);
	}

  close() {
    this.props.dispatch(closeShareModal())
  }

  newCollab () {
    this.props.dispatch(DashActions.addCollabRoute(this.state.value,this.props.space._id));
    // after this completes we want to add the email to the list;
  }

  handleChange() {
    this.setState({
      value: this.refs.input.getValue()
    });
  }

  render(){
    let addBtn = <Button onClick={this.newCollab} className={cx('addBtn')}><Glyphicon glyph='plus' /></Button>;

    return (
      <div className={cx('shareModal')}>
          <Modal show={this.props.showShareModal} onHide={this.close}>
            <Modal.Header className={cx('shareModalHeader')} classcloseButton>
              <Modal.Title>Sharing Dashboard</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={cx('collabs')} >
                <h4>Collaborators</h4>
                <div>
                  <div className={cx('userImg')}></div>
                  <p>{this.props.space ? this.props.space.user : ''} (Owner)</p>
                </div>
                <ShareModalCollabs collabs={this.props.space ? this.props.space.collabs : []} />
                <hr/>
                <div>Share This Space</div>
                <form>
                  <Input type='text' placeholder="Enter User's E-mail" ref="input" buttonAfter={addBtn} onChange={this.handleChange} />
                </form>
                <hr />
                <h4>Other Info</h4>
                <p></p>
              </div>
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
    showShareModal: store.spacecontrol.showShareModal,
    user: store.user,
    space: store.spacecontrol.space
  };
}

export default connect(mapStateToProps)(ShareModal);
