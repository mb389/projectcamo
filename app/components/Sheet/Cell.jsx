import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateCell, showLookupModal, currentCell, updateFormulaCell, moveToCell } from 'actions/sheet';
import styles from 'css/components/table';
import { Modal, Glyphicon, Button, Input } from 'react-bootstrap';
import { searching } from 'actions/SpaceControls'
import ContentEditable from 'react-contenteditable';
import LinkLabel from './CellTypes/LinkLabel';
import Checkbox from './CellTypes/Checkbox';
import SelectOptionCell from './CellTypes/SelectOptionCell';


const cx = classNames.bind(styles);

class Cell extends Component {
	constructor(props, state){
		super(props, state)
    const { cellKey, rowIdx, grid } = this.props;
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
	}


	handleChange(evt){
	  const { dispatch, cellKey, rowIdx, row } = this.props;

    let recalculateCells = []
    for (let cell in row) {
      if (row[cell].type === 'Formula') {
        row[cell].col = cell;
        recalculateCells.push(row[cell]);
      }
    }
    dispatch(updateCell(evt.target.value, cellKey, rowIdx, null, recalculateCells));
	}

  showLookupModal(row,rowIdx,cell,cellKey){
    this.props.dispatch(showLookupModal(row,rowIdx,cell,cellKey))
  }

  editable (evt) {
    this.setState({disabled: false});
    if(evt.target.children[0]) evt.target.children[0].focus();
    else evt.target.focus();
  }

  cell(cell, cellKey, row, rowIdx, cellIdx){
    // type of cells are defined in MenuEditCol Component
    switch (cell.type) {
      case 'Images':
        cell.data = cell.data || [];
        return (cell.data.map(function (img, i) {
          return (<img src={img} key={i} className={cx('img-thumb')}/>)
        }))
      case 'Reference':
        const labels = cell.data ? cell.data.map((label, i)=> <LinkLabel data={label.data} key={i} />) : <span key='0'></span>
        return  (
          <div>
            <Button bsSize="small" onClick={this.showLookupModal.bind(this,row,rowIdx,cell,cellKey)}><Glyphicon glyph="plus" /></Button>
            {labels}
          </div>
        )
      case 'Checkbox':
          return (
						<div className={cx('checkboxCheck')}>
							<Checkbox dispatch={this.props.dispatch} cell={cell} cellKey={cellKey} rowIdx={rowIdx} row={row}/>
						</div>
					)
      case 'Select':
          return (<SelectOptionCell
              dispatch={this.props.dispatch}
              cell={cell}
              cellKey={cellKey}
              rowIdx={rowIdx}
              row={row}
              />
            )
      case 'Link':
      case 'Number':
      default:
          return (<ContentEditable
          className={cx('cellContent')}
          html={cell.data} // innerHTML of the editable div
          disabled={this.state.disabled || this.props.disableAll}       // use true to disable edition
          onChange={this.handleChange} // handle innerHTML change
          onDoubleClick={this.editable} // allow for cell editing after focus
          onMouseEnter={this.setMouseEnter} // handle innerHTML change
          onMouseLeave={this.setMouseLeave} // handle innerHTML change
        />)
    }
  }

	setMouseEnter (evt) {
		evt.target.parentElement.parentElement.style.backgroundColor = '#e9e9e9';
	}

	setMouseLeave (evt) {
		evt.target.parentElement.parentElement.style.backgroundColor = '';
	}

	handleCell() {
    if(!this.props.cell.focused) this.props.dispatch(currentCell(this.props));
		// this.props.searching ? this.props.dispatch(searching(false)) : null;
	}

 keyPress (evt) {
      if (evt.keyCode >= 37 && evt.keyCode <= 40 || evt.keyCode === 13) {
          evt.preventDefault();
          this.props.dispatch(moveToCell(evt.keyCode))
      } else {
          this.editable(evt);
      }
  }

	render () {
    const { cellKey, rowIdx, grid, cell, row } = this.props;

    return (
      <div tabIndex='-1'
				className={cx('cell')}
				style={{width: this.props.cell.width}}
				id={''+this.props.cellKey+this.props.rowIdx}
        onDoubleClick={this.editable} // allow for cell editing after focus
				onClick={this.handleCell}
				onKeyDown={this.keyPress} // for key navigation
        ref={(c) => {
          if(this.props.cell.focused && c) c.focus();
        }}
        // IF this focused = true we are still running onFocus?
        >
        {this.cell(cell,cellKey,row,rowIdx)}
      </div>
      );
  }

  shouldComponentUpdate (nextProps) {
    if (this.props.cell.type === "Select") {
      // don't rerender when opening a select cell
      return this.props.cell.focused === nextProps.cell.focused;
    }


    for (let keys in nextProps.cell) {
      if (nextProps.cell[keys] !== this.props.cell[keys]) {
        return true
      }
    }
    
    return false;
  }
}



Cell.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Cell);
