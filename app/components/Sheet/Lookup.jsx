import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { closeRowModal } from 'actions/sheet';
import styles from 'css/components/modal';
import { Modal, Button, ButtonGroup } from 'react-bootstrap';

const cx = classNames.bind(styles);

class Lookup extends Component {
	constructor(props, state){
		super(props, state)
    this.state = {sheet: null}
		this.close = this.close.bind(this)
    this.sheets = this.sheets.bind(this)
    this.setSheet = this.setSheet.bind(this)
	}

	close() {
    // this.props.dispatch(closeLookup())
  }

  setSheet(sheet){
    console.log(sheet)
    this.setState({ sheet })
  }

  sheets(){
    return this.props.sheets.filter((sheet)=>sheet._id !== this.props.sheetToShow._id)
    .map((sheet,i) => (
        <Button bsStyle="info" onClick={this.setSheet.bind(null, sheet)}>{sheet.name}</Button>
      )
    )
  }

  sheetColumns(){
    if (!this.state.sheet) return <h3>Pick a sheet...</h3>

    return (
      this.state.sheet.content.columnHeaders.map((col) => 
        <Button bsStyle="primary">{col.name}</Button>
      )
    )
  }

  render() {
    if (!this.props.sheets) return <span></span>
    return (
      <Modal show={this.props.showLookupModal} onHide={this.close} dialogClassName={cx('wide-modal')}>
        <Modal.Body>
          <div classNames="row">
            <ButtonGroup>
              {this.sheets()}
            </ButtonGroup>
          </div>
          <div classNames="row">
            <ButtonGroup>
              {this.sheetColumns()}
            </ButtonGroup>
          </div>
        </Modal.Body>
      </Modal>
    );
	}
}


function mapStateToProps(store) {
  return {
    sheets: store.spacecontrol.sheets,
    sheetToShow: store.spacecontrol.sheetToShow,
    showLookupModal: store.sheet.showLookupModal
  };
}

export default connect(mapStateToProps)(Lookup);

