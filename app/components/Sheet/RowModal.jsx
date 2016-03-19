import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import Cell from './Cell';
import { connect } from 'react-redux';
import { closeRowModal } from 'actions/sheet';
import styles from 'css/components/table';
import { Modal } from 'react-bootstrap';

const cx = classNames.bind(styles);

class RowModal extends Component {
	constructor(props, state){
		super(props, state)
		this.close = this.close.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	close() {
    // dispatch close modal
    this.props.dispatch(closeRowModal())
  }

  handleChange(evt){
  	const { dispatch } = this.props;
    this.setState({html: evt.target.value});
    dispatch(updateCell(evt.target.value, this.props.cellKey, this.props.rowIdx))
  }

  rowCells(){
    const { modalRow } = this.props;
    const cells = [];
    for (let key in modalRow) {
      cells.push(<Cell cell={modalRow[key]} key={key} cellKey={key} row={modalRow} cellIdx={cells.length}/>);
    }
    return cells    
  }

  render () {
    return (
      <Modal show={this.props.showRowModal} onHide={this.close}>
        <Modal.Body>
          {this.rowCells()}
        </Modal.Body>
      </Modal>
    );
	}
}


function mapStateToProps(store) {
  return {
    showRowModal: store.sheet.showRowModal,
    modalRow: store.sheet.modalRow
  };
}

export default connect(mapStateToProps)(RowModal);

