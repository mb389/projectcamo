import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateCell, showLookupModal, currentCell, updateFormulaCell, moveToCell } from 'actions/sheet';
import styles from 'css/components/table';
import { Modal, Glyphicon, Button, Label } from 'react-bootstrap';
import { searching } from 'actions/SpaceControls'
import ContentEditable from 'react-contenteditable';


const cx = classNames.bind(styles);

class Cell extends Component {
	constructor(props, state){
		super(props, state)
    const { cellKey, rowIdx, grid } = this.props;
    this.state = {disabled: true};
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

    row[cellKey].data = dispatch(updateCell(evt.target.value, cellKey, rowIdx)).cell.data;

    for (let cell in row) {
      if (row[cell].type === 'Formula') {
        dispatch(updateFormulaCell(cell, rowIdx, row[cell].formula, row));
      }
    }
	}

  showLookupModal(row,rowIdx,cell){
    this.props.dispatch(showLookupModal(row,rowIdx,cell))
  }

  editable (evt) {
    this.setState({disabled: false});
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
        const labels = cell.data ? cell.data.map((label, i)=><Label bsStyle="info" key={i}>{label.data}</Label> ) : <span></span>
        return  (
          <div>
            <Button bsSize="small" onClick={this.showLookupModal.bind(this,row,rowIdx,cell)}><Glyphicon glyph="plus" /></Button>
            {labels}
          </div>
        )
      case 'Checkbox':
          return (<input className={cx('cellCheckBox')+ " checkbox"} type='checkbox' onClick={this.handleChange} value={cell.data!=='true'} />)
      case 'Select':
      case 'Link':
      case 'Number':  
      default: 
        return (<ContentEditable
        ref = "focusArea"
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
		this.props.dispatch(currentCell(this.props));
		// this.props.searching ? this.props.dispatch(searching(false)) : null;
	}

 keyPress (evt) {
      if (evt.keyCode >= 37 && evt.keyCode <= 40) {
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
				id={''+this.props.cellKey+this.props.rowIdx}
        onDoubleClick={this.editable} // allow for cell editing after focus
				onFocus={this.handleCell}
				onKeyDown={this.keyPress} // for key navigation
        >
        {this.cell(cell,cellKey,row,rowIdx)}
      </div>
      );
  }
}

Cell.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Cell);
