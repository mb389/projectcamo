import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from 'css/components/modal';
import { Modal, Glyphicon, InputGroup, Button, FormGroup, FormControl } from 'react-bootstrap';
import { closeShareModal } from 'actions/SpaceControls';
import * as DashActions from 'actions/dashboard';
import ShareModalCollabs from './ShareModalCollabs';

const cx = classNames.bind(styles);

class ShareModal extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = { value: '' };
    this.close = this.close.bind(this);
    this.newCollab = this.newCollab.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  close() {
    this.props.dispatch(closeShareModal());
  }

  newCollab() {
    this.props.dispatch(DashActions.addCollabRoute(this.state.value, this.props.space._id));
    // after this completes we want to add the email to the list;
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  render() {
    let addBtn = <Button onClick={this.newCollab} className={cx('addBtn')}><Glyphicon glyph="plus" /></Button>;
    return (
      <div className={cx('shareModal')}>
        <Modal show={this.props.showShareModal} onHide={this.close}>
          <Modal.Header className={cx('shareModalHeader')}>
            <Modal.Title>Sharing Dashboard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className={cx('collabs')} >
              <h4>Collaborators</h4>
              <div>
                <div className={cx('userImg')}></div>
                <p>{this.props.space ? this.props.space.user.email : ''} (Owner)</p>
              </div>
              <ShareModalCollabs collabs={this.props.space ? this.props.space.collabs : []} />
              <hr />
              <div>Share This Space</div>
              <FormGroup>
                <InputGroup>
                    <FormControl
                      type="text"
                      placeholder="Enter User's E-mail"
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                    <InputGroup.Button>
                      {addBtn}
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
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
