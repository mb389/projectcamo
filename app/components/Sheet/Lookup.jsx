import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { closeLookupModal, updateCellById } from 'actions/sheet';
import { updateRefSheet, removeRef } from 'actions/spacecontrols';
import styles from 'css/components/modal';
import { Modal, Button, ButtonGroup, Panel } from 'react-bootstrap';

const cx = classNames.bind(styles);

class Lookup extends Component {
	constructor(props, state){
		super(props, state)
    this.state = {sheet: null}
		this.close = this.close.bind(this)
    this.sheets = this.sheets.bind(this)
    this.setSheet = this.setSheet.bind(this)
    this.sheetRowPanels = this.sheetRowPanels.bind(this)
    this.linkRow = this.linkRow.bind(this)
    this.unlinkRow = this.unlinkRow.bind(this)
    this.whichButton = this.whichButton.bind(this)
	}

	close() {
    this.props.dispatch(closeLookupModal())
    this.setState({sheet: null})
  }

  setSheet(sheet){
    this.setState({ sheet })
  }

  sheets(){
    if (this.props.lookup.cell.data && this.props.lookup.cell.data.length && !this.state.sheet) {
      console.log(this.props.lookup.cell.data)
      let theSheet = this.props.sheets.filter((sheet)=>sheet._id === this.props.lookup.cell.data[0].sheet)
      this.setState({ sheet:  theSheet[0] })
      return <h3>Sheet already Picked</h3>
    } else if (!this.state.sheet) {
      return this.props.sheets.filter((sheet)=>sheet._id !== this.props.sheetToShow._id)
      .map((sheet,i) => (
          <Button bsStyle="info" onClick={this.setSheet.bind(null, sheet)}>{sheet.name}</Button>
        )
      )
    }
  }

  linkRow(rowId){
    let cellData = this.props.lookup.cell.data
    let data = {data: rowId.data, rowId: rowId, sheet: this.state.sheet._id}
    cellData ? cellData.push(data) : cellData = [data]
    this.props.dispatch(updateCellById(cellData,this.props.lookup.cell.id))
    this.props.dispatch(updateRefSheet(this.state.sheet,data,this.props.sheetToShow,this.props.lookup.row))
    this.close()
  }

  unlinkRow(rowId) {
    let cellData = this.props.lookup.cell.data
    for (var i = 0; i < cellData.length; i++) {
      if (cellData[i].data === rowId.data) {
        cellData.splice(i,1)
        this.props.dispatch(updateCellById(cellData,this.props.lookup.cell.id))
        this.close()
        break;
      }
    }
    let data = {data: rowId.data, rowId: rowId, sheet: this.state.sheet._id}
    this.props.dispatch(removeRef(this.state.sheet,data,this.props.sheetToShow,this.props.lookup.row)) 
  }


  whichButton(rowId){
    let links = this.props.lookup.cell.data

    if (!links) return <Button bsStyle="success" onClick={this.linkRow.bind(this, rowId)} >Link</Button>

    for (var i = 0; i < links.length; i++) {
      if (links[i].data === rowId.data) return <Button bsStyle="warning" onClick={this.unlinkRow.bind(this, rowId)} >Unlink</Button>
    }

    return <Button bsStyle="success" onClick={this.linkRow.bind(this, rowId)} >Link</Button>

  }

  sheetRowPanels(){
    if (!this.state.sheet) return <h3>Pick a sheet...</h3>

    

    return (
      this.state.sheet.content.grid.map((row) => {
          return (
            <div>
              <Panel header={row['100'].data}>
                {this.whichButton(row['100'])}
              </Panel>
            </div>
          )
        }
      )
    )
  }

  render() {
    if (!this.props.sheets || !this.props.showLookupModal) return <span></span>
    return (
      <Modal show={this.props.showLookupModal} onHide={this.close} >
        <Modal.Body>
          <div classNames="row">
            <ButtonGroup>
              {this.sheets()}
            </ButtonGroup>
          </div>
          <br/>
          <div classNames="row">
            <ButtonGroup>
              {this.sheetRowPanels()}
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
    showLookupModal: store.sheet.showLookupModal,
    lookup: store.sheet.lookup
  };
}

export default connect(mapStateToProps)(Lookup);

