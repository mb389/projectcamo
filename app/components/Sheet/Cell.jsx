import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateCell, showRowModal } from 'actions/sheet';
import styles from 'css/components/table';
import { Modal } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';

const cx = classNames.bind(styles);

class Cell extends Component {
	constructor(props, state){
		super(props, state)
    const { cellKey, rowIdx, grid } = this.props;
    this.state = {disabled: true, html: this.props.cell.data};
    // leaving disabled in case we choose to use it later
    this.openModal = this.openModal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setMouseEnter = this.setMouseEnter.bind(this);
		this.setMouseLeave = this.setMouseLeave.bind(this);
    this.cell = this.cell.bind(this);
    this.editable = this.editable.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
	}

	openModal(){
  	// dispatch show modal
  	const { dispatch, rowIdx } = this.props;
  	dispatch(showRowModal(rowIdx))
	}

	handleChange(evt){
	  const { dispatch, cellKey, rowIdx } = this.props;
	  // this.setState({html: evt.target.value});
	  dispatch(updateCell(evt.target.value, cellKey, rowIdx))
	}

  editable (evt) {
    this.setState({disabled: false});
  }

  cell(cell, cellKey, row, rowIdx, cellIdx){
    if (cell.type === 'Images') {
			cell.data = cell.data || [];
      return (cell.data.map(function (img, i) {
        return (<img src={img} key={i} className={cx('img-thumb')}/>)
      }))
    } else {
      return (<ContentEditable
        html={cell.data} // innerHTML of the editable div
        disabled={this.state.disabled}       // use true to disable edition
        onChange={this.handleChange} // handle innerHTML change
        onMouseEnter={this.setMouseEnter} // highlight row
        onMouseLeave={this.setMouseLeave} // remove highlght
      />)
    }
  }

	setMouseEnter (evt) {
	evt.target.parentElement.parentElement.style.backgroundColor = '#e9e9e9';
	}

	setMouseLeave (evt) {
	evt.target.parentElement.parentElement.style.backgroundColor = '';
	}

  keyPress (evt) {
    console.log(evt.target.id);
    let col = Number(evt.target.id.substr(0,3));
    let row = Number(evt.target.id.substr(3));
    switch (evt.keyCode) {
      case 37:{
              this.handleFocus(""+(col-1)+row);
              break;}
      case 38:{
              this.handleFocus(""+col+(row-1));
              break;}
      case 39:{
              this.handleFocus(""+(col+1)+row);
              break;}
      case 40:{
              this.handleFocus(""+col+(row+1));
              break;}
      default:
        this.editable(evt);
        break;
    }
  }

  handleFocus (selId) {
    console.log('handleFocus ', selId)
    document.getElementById(selId).focus();
  }

	render () {
    const { cellKey, rowIdx, grid, cell, row } = this.props;
    if (this.props.cellIdx === 0) {
        return (
          <div tabIndex='-1' className={cx('cell')} key={this.props.key}
            id={''+this.props.cellKey+this.props.rowIdx}
            onDoubleClick={this.editable} // allow for cell editing after focus
            onKeyDown={this.keyPress} // for key navigation
            >
            <a className={cx('cell-expand')} onClick={this.openModal}>
              <i className="glyphicon glyphicon-resize-full" />
            </a>
            <ContentEditable className={cx('cell', 'first-cell')}
              html={cell.data} // innerHTML of the editable div
              disabled={this.state.disabled}       // use true to disable edition
              onChange={this.handleChange} // handle innerHTML change
              onMouseEnter={this.setMouseEnter} // highlight row
              onMouseLeave={this.setMouseLeave} // remove highlght
            />
          </div>
        );
    }

    return (
      <div tabIndex='-1' className={cx('cell')} id={''+this.props.cellKey+this.props.rowIdx}
        onDoubleClick={this.editable} // allow for cell editing after focus
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
