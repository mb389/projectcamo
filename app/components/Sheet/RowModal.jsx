import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import TextModal from './ModalTypes/Text';
import ImageList from './ModalTypes/ImageList';
import ModalCheckBox from './ModalTypes/ModalCheckBox';
import { connect } from 'react-redux';
import { closeRowModal, deleteRow } from 'actions/sheet';
import styles from 'css/components/modal';
import { Modal, Glyphicon, Button, Input } from 'react-bootstrap';
import LinkLabel from './CellTypes/LinkLabel';
import SelectOptionCell from './CellTypes/SelectOptionCell';

const cx = classNames.bind(styles);

class RowModal extends Component {
	constructor(props, state){
		super(props, state)
		this.close = this.close.bind(this)
    this.cell = this.cell.bind(this)
    this.deleteRow = this.deleteRow.bind(this)
    this.rowName = this.rowName.bind(this)
	}

  rowName(){
    if (this.props.modalRow) return this.props.modalRow['100'].data
  }

	close(dontSave) {
    this.props.dispatch(closeRowModal(dontSave))
  }

  cell(cell, cellKey, row, rowIdx, cellIdx){
    switch (cell.type) {
      case 'Images':
        return <ImageList cell={cell} cellKey={cellKey} row={row} rowIdx={rowIdx} cellIdx={cellIdx}/>
      case 'Reference':
        const labels = cell.data ? cell.data.map((label, i)=> <LinkLabel data={label.data} key={i} />) : <span key='0'></span>
        return  (
          <div>
            {labels}
          </div>
        )
      case 'Checkbox':
          return <ModalCheckBox dispatch={this.props.dispatch} cell={cell} cellKey={cellKey} rowIdx={rowIdx}/>
      case 'Select': return (<SelectOptionCell 
              dispatch={this.props.dispatch}
              cell={cell}
              cellKey={cellKey}
              rowIdx={rowIdx}
              />
            )
      case 'Link':
      case 'Number':
      default:
          return <TextModal cell={cell} cellKey={cellKey} row={row} rowIdx={rowIdx} cellIdx={cellIdx}/>
    }
  }

  deleteRow(){
    this.props.dispatch(deleteRow(this.props.modalRowIdx))
    this.close(true);
  }

  rowCells(){
    const { modalRow, modalRowIdx, columnHeaders } = this.props;
    if (!modalRow) return
    return columnHeaders.map((head, i) => {
      return (
        <div key={i}>
          <div className={cx('col-header')}>{head.name}</div>
          <div className={cx('wrapper')}>
            {this.cell(modalRow[head['id']],head['id'],modalRow,modalRowIdx,i)}
          </div>
        </div>
      );
    })   
  }

  render () {
    return (
      <Modal show={this.props.showRowModal} onHide={this.close} className={cx('modalRow')}>
        <Modal.Header  className={cx('shareModalHeader')} >
          <Modal.Title>
            <h3>{this.rowName()}</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx('darkModal')}>
          {this.rowCells()}
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.deleteRow}>Delete Row</Button>
        </Modal.Footer>
      </Modal>
    );
	}
}


function mapStateToProps(store) {
  return {
    showRowModal: store.sheet.showRowModal,
    modalRow: store.sheet.modalRow.data,
    modalRowIdx: store.sheet.modalRow.rowIdx,
    columnHeaders: store.sheet.columnHeaders
  };
}

export default connect(mapStateToProps)(RowModal);

