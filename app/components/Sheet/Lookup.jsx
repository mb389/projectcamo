import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { closeLookupModal, updateCellById } from 'actions/sheet';
import { updateRefSheet } from 'actions/spacecontrols';
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
	}

	close() {
    this.props.dispatch(closeLookupModal())
    this.setState({sheet: null})
  }

  setSheet(sheet){
    this.setState({ sheet })
  }

  sheets(){
    if (this.props.lookup.cell.data && !this.state.sheet) {
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

  sheetRowPanels(){
    if (!this.state.sheet) return <h3>Pick a sheet...</h3>

    return (
      this.state.sheet.content.grid.map((row) => {
          return (
            <Panel header={row['100'].data}>
              <Button bsStyle="warning" onClick={this.linkRow.bind(this, row['100'])}>Link</Button>
            </Panel>
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

