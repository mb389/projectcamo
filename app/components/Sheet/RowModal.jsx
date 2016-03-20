import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import TextModal from './ModalTypes/Text';
import { connect } from 'react-redux';
import { closeRowModal } from 'actions/sheet';
import styles from 'css/components/table';
import { Modal } from 'react-bootstrap';

const cx = classNames.bind(styles);

class RowModal extends Component {
	constructor(props, state){
		super(props, state)
		this.close = this.close.bind(this)
	}

	close() {
    this.props.dispatch(closeRowModal())
  }

  rowCells(){
    const { modalRow, modalRowIdx } = this.props;
    const cells = [];
    for (let key in modalRow) {
      cells.push(<TextModal cell={modalRow[key]} key={key} cellKey={key} row={modalRow} rowIdx={modalRowIdx} cellIdx={cells.length}/>);
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
    modalRow: store.sheet.modalRow.data,
    modalRowIdx: store.sheet.modalRow.rowIdx
  };
}

export default connect(mapStateToProps)(RowModal);

