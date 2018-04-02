import React, {Component} from 'react';
import classNames from 'classnames/bind';
import {connect} from 'react-redux';
import {closeLookupModal, updateCellById, updateColumn} from 'actions/sheet';
import {updateRefSheet, removeRef} from 'actions/SpaceControls';
import styles from 'css/components/modal';
import LinkLabel from './CellTypes/LinkLabel';
import {Modal, Button, ButtonGroup, Panel, ListGroup, ListGroupItem, Input} from 'react-bootstrap';

const cx = classNames.bind(styles);

class Lookup extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {sheet: null};
    this.close = this.close.bind(this);
    this.sheets = this.sheets.bind(this);
    this.setSheet = this.setSheet.bind(this);
    this.sheetRowPanels = this.sheetRowPanels.bind(this);
    this.linkRow = this.linkRow.bind(this);
    this.unlinkRow = this.unlinkRow.bind(this);
    this.whichButton = this.whichButton.bind(this);
    this.findColHeader = this.findColHeader.bind(this);
    this.getTargetName = this.getTargetName.bind(this);
    this.getRecords = this.getRecords.bind(this);
    this.recType = this.recType.bind(this);
  }

  getTargetName() {
    if (this.state.sheet) return this.state.sheet.name;
    return '...';
  }

  setSheet(sheet, column) {
    const newCol = Object.assign({}, column);
    newCol.linkedSheet = sheet._id;
    newCol.name = sheet.name;
    this.props.dispatch(updateColumn(newCol));
  }

  getRecords(row) {
    const listItems = [];
    for (const key in row) {
      const columnName = this.state.sheet.content.columnHeaders.filter((col) => col.id === key)[0]
        .name;
      listItems.push(
        <ListGroupItem key={key}>
          <strong>{columnName}: </strong>
          {this.recType(row[key], key)}
        </ListGroupItem>
      );
    }
    return listItems;
  }

  recType(cell) {
    const labels = cell.data ? (
      cell.data.map((label, i) => <LinkLabel data={label.data} key={i} />)
    ) : (
      <span key="0" />
    );
    switch (cell.type) {
      case 'Images':
        cell.data = cell.data || [];
        return cell.data.map((img, i) => <img src={img} key={i} className={cx('img-thumb')} />);
      case 'Reference':
        return <div>{labels}</div>;
      case 'Checkbox':
        return (
          <Input
            className={cx('cellCheckBox')}
            type="checkbox"
            label=" "
            checked={cell.data === 'checked'}
            readOnly
          />
        );
      default:
        return cell.data;
    }
  }

  whichButton(rowId) {
    const links = this.props.lookup.cell.data;

    if (!links)
      return (
        <Button bsStyle="success" onClick={this.linkRow.bind(this, rowId)}>
          Link
        </Button>
      );

    for (let i = 0; i < links.length; i++) {
      if (links[i].data === rowId.data)
        return (
          <Button bsStyle="warning" onClick={this.unlinkRow.bind(this, rowId)}>
            Unlink
          </Button>
        );
    }

    return (
      <Button bsStyle="success" onClick={this.linkRow.bind(this, rowId)}>
        Link
      </Button>
    );
  }

  linkRow(rowId) {
    let cellData = this.props.lookup.cell.data;
    const data = {data: rowId.data, rowId, sheet: this.state.sheet._id};
    if (cellData) {
      cellData.push(data);
    } else {
      cellData = [data];
    }
    this.props.dispatch(updateCellById(cellData, this.props.lookup.cell.id));
    this.props.dispatch(
      updateRefSheet(this.state.sheet, data, this.props.sheetToShow, this.props.lookup.row)
    );
    this.close();
  }

  unlinkRow(rowId) {
    const cellData = this.props.lookup.cell.data;
    for (let i = 0; i < cellData.length; i++) {
      if (cellData[i].data === rowId.data) {
        cellData.splice(i, 1);
        this.props.dispatch(updateCellById(cellData, this.props.lookup.cell.id));
        this.close();
        break;
      }
    }
    const data = {data: rowId.data, rowId, sheet: this.state.sheet._id};
    this.props.dispatch(
      removeRef(this.state.sheet, data, this.props.sheetToShow, this.props.lookup.row)
    );
  }

  sheets() {
    const colInfo = this.findColHeader();
    if (colInfo.linkedSheet && !this.state.sheet) {
      const theSheet = this.props.sheets.filter((sheet) => sheet._id === colInfo.linkedSheet)[0];
      this.setState({sheet: theSheet});
      return <h3>Sheet already Picked</h3>;
    } else if (!this.state.sheet) {
      return this.props.sheets
        .filter((sheet) => sheet._id !== this.props.sheetToShow._id)
        .map((sheet, i) => (
          <Button key={i} bsStyle="info" onClick={this.setSheet.bind(null, sheet, colInfo)}>
            {sheet.name}
          </Button>
        ));
    }
    return null;
  }

  findColHeader() {
    const {lookup, columnHeaders} = this.props;
    return columnHeaders.filter((col) => col.id === lookup.colId)[0];
  }

  close() {
    this.props.dispatch(closeLookupModal());
    this.setState({sheet: null});
  }

  sheetRowPanels() {
    if (!this.state.sheet) return <h3>Pick a sheet...</h3>;

    return this.state.sheet.content.grid.map((row, i) => (
      <div className={cx('refTabs')}>
        <Panel header={this.whichButton(row['100'])}>
          <ListGroup>{this.getRecords(row, i)}</ListGroup>
        </Panel>
      </div>
    ));
  }

  render() {
    if (!this.props.sheets || !this.props.showLookupModal) return <span />;
    return (
      <Modal show={this.props.showLookupModal} onHide={this.close}>
        <Modal.Header className={cx('referenceHead')} classcloseButton>
          <Modal.Title>
            Link {this.props.lookup.row['100'].data} to {this.getTargetName()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={cx('referenceBody')}>
          <div classNames="row">
            <ButtonGroup>{this.sheets()}</ButtonGroup>
          </div>
          <br />
          <div classNames="row">
            <ButtonGroup className={cx('rowButton')}>{this.sheetRowPanels()}</ButtonGroup>
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
    lookup: store.sheet.lookup,
    columnHeaders: store.sheet.columnHeaders,
  };
}

export default connect(mapStateToProps)(Lookup);
