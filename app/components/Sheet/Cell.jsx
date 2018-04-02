import React, {Component} from 'react';
import classNames from 'classnames/bind';
import {updateCell, showLookupModal, currentCell, moveToCell} from 'actions/sheet';
import styles from 'css/components/table';
import {Glyphicon, Button} from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';
import LinkLabel from './CellTypes/LinkLabel';
import Checkbox from './CellTypes/Checkbox';
import SelectOptionCell from './CellTypes/SelectOptionCell';

const cx = classNames.bind(styles);

class Cell extends Component {
  constructor(props, state) {
    super(props, state);
    this.state = {disabled: false};
    // leaving disabled in case we choose to use it later
    this.handleCell = this.handleCell.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setMouseEnter = this.setMouseEnter.bind(this);
    this.setMouseLeave = this.setMouseLeave.bind(this);
    this.cell = this.cell.bind(this);
    this.editable = this.editable.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.showLookupModal = this.showLookupModal.bind(this);
    this.handleLink = this.handleLink.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.cell.type === 'Select') {
      // don't rerender when opening a select cell
      return this.props.cell.focused === nextProps.cell.focused;
    }

    for (const keys in nextProps.cell) {
      if (nextProps.cell[keys] !== this.props.cell[keys]) {
        return true;
      }
    }
    return false;
  }

  setMouseEnter(evt) {
    evt.target.parentElement.parentElement.style.backgroundColor = '#e9e9e9';
  }

  setMouseLeave(evt) {
    evt.target.parentElement.parentElement.style.backgroundColor = '';
  }

  cell(cell, cellKey, row, rowIdx) {
    // type of cells are defined in MenuEditCol Component
    switch (cell.type) {
      case 'Images':
        cell.data = cell.data || [];
        return cell.data.map((img, i) => <img src={img} key={i} className={cx('img-thumb')} />);
      case 'Reference':
        const labels = cell.data ? (
          cell.data.map((label, i) => <LinkLabel data={label.data} key={i} />)
        ) : (
          <span key="0" />
        );
        return (
          <div>
            <Button
              bsSize="small"
              onClick={this.showLookupModal.bind(this, row, rowIdx, cell, cellKey)}
            >
              <Glyphicon glyph="plus" />
            </Button>
            {labels}
          </div>
        );
      case 'Checkbox':
        return (
          <div className={cx('checkboxCheck')}>
            <Checkbox
              dispatch={this.props.dispatch}
              cell={cell}
              cellKey={cellKey}
              rowIdx={rowIdx}
              row={row}
            />
          </div>
        );
      case 'Select':
        return (
          <SelectOptionCell
            dispatch={this.props.dispatch}
            cell={cell}
            cellKey={cellKey}
            rowIdx={rowIdx}
            row={row}
          />
        );
      case 'Link':
        return (
          <ContentEditable
            className={cx('cellContent', 'cellLink')}
            html={cell.data} // innerHTML of the editable div
            tagName="a"
            disabled={this.state.disabled || this.props.disableAll} // use true to disable edition
            onChange={this.handleChange} // handle innerHTML change
            onDoubleClick={this.editable} // allow for cell editing after focus
            onContextMenu={this.handleLink}
            onMouseEnter={this.setMouseEnter} // handle innerHTML change
            onMouseLeave={this.setMouseLeave}
          />
        );
      case 'Number':
        break;
      default:
        return (
          <ContentEditable
            className={cx('cellContent')}
            html={cell.data} // innerHTML of the editable div
            disabled={this.state.disabled || this.props.disableAll} // use true to disable edition
            onChange={this.handleChange} // handle innerHTML change
            onDoubleClick={this.editable} // allow for cell editing after focus
            onMouseEnter={this.setMouseEnter} // handle innerHTML change
            onMouseLeave={this.setMouseLeave}
          />
        );
    }
    return null;
  }

  handleLink(e) {
    e.preventDefault();
    if (window) {
      window.open(this.props.cell.data, '_blank').focus();
    }
  }

  editable(evt) {
    this.setState({disabled: false});
    if (evt.target.children[0]) evt.target.children[0].focus();
    else evt.target.focus();
  }

  showLookupModal(row, rowIdx, cell, cellKey) {
    this.props.dispatch(showLookupModal(row, rowIdx, cell, cellKey));
  }

  handleChange(evt) {
    const {dispatch, cellKey, rowIdx, row} = this.props;
    const recalculateCells = [];
    for (const cell in row) {
      if (row[cell].type === 'Formula') {
        row[cell].col = cell;
        recalculateCells.push(row[cell]);
      }
    }
    dispatch(updateCell(evt.target.value, cellKey, rowIdx, null, recalculateCells));
  }

  handleCell() {
    if (!this.props.cell.focused) this.props.dispatch(currentCell(this.props));
    // this.props.searching ? this.props.dispatch(searching(false)) : null;
  }

  keyPress(evt) {
    if ((evt.keyCode >= 37 && evt.keyCode <= 40) || evt.keyCode === 13) {
      evt.preventDefault();
      this.props.dispatch(moveToCell(evt.keyCode));
    } else {
      this.editable(evt);
    }
  }

  render() {
    const {cellKey, rowIdx, cell, row} = this.props;

    return (
      <div
        tabIndex="-1"
        className={cell.type === 'Link' && cell.data ? cx('cell', 'cellLink') : cx('cell')}
        style={{width: this.props.cell.width}}
        id={`${this.props.cellKey}${this.props.rowIdx}`}
        onDoubleClick={this.editable} // allow for cell editing after focus
        onClick={this.handleCell}
        onKeyDown={this.keyPress} // for key navigation
        ref={(c) => {
          if (this.props.cell.focused && c) c.focus();
        }}
      >
        {this.cell(cell, cellKey, row, rowIdx)}
      </div>
    );
  }
}

export default Cell;
