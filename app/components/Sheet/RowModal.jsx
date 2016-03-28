import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import TextModal from './ModalTypes/Text';
import ImageList from './ModalTypes/ImageList';
import { connect } from 'react-redux';
import { closeRowModal } from 'actions/sheet';
import styles from 'css/components/modal';
import { Modal, Glyphicon, Button } from 'react-bootstrap';
import LinkLabel from './CellTypes/LinkLabel'

const cx = classNames.bind(styles);

class RowModal extends Component {
	constructor(props, state){
		super(props, state)
		this.close = this.close.bind(this)
    this.cell = this.cell.bind(this)
	}

	close() {
    this.props.dispatch(closeRowModal())
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
          return (<input className={cx('cellCheckBox')+ " checkbox"} type='checkbox' value={cell.data==='true'} />)
      case 'Select':
      case 'Link':
      case 'Number':
      default:
          return <TextModal cell={cell} cellKey={cellKey} row={row} rowIdx={rowIdx} cellIdx={cellIdx}/>
    }
  }

  rowCells(){
    const { modalRow, modalRowIdx, columnHeaders } = this.props;
    const cells = [];
    for (let key in modalRow) {
      cells.push(
        <div key={key}>
          <div className={cx('col-header')}>{columnHeaders[cells.length].name}</div>
          <div className={cx('wrapper')}>
            {this.cell(modalRow[key],key,modalRow,modalRowIdx,cells.length)}
          </div>
        </div>
      );
    }
    return cells    
  }

  render () {
    return (
      <Modal show={this.props.showRowModal} onHide={this.close} className={cx('modalRow')}>
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
    modalRowIdx: store.sheet.modalRow.rowIdx,
    columnHeaders: store.sheet.columnHeaders
  };
}

export default connect(mapStateToProps)(RowModal);

