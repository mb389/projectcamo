import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateCell, showRowModal, currentCell } from 'actions/sheet';
import styles from 'css/components/table';
import { Modal, Glyphicon } from 'react-bootstrap';
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
    this.handleFocus = this.handleFocus.bind(this);
	}

	handleChange(evt){
	  const { dispatch, cellKey, rowIdx } = this.props;
	  dispatch(updateCell(evt.target.value, cellKey, rowIdx))
	}

  editable (evt) {
    this.setState({disabled: false});
  }

  cell(cell, cellKey, row, rowIdx, cellIdx){
    if (cell.type === 'Images' ) {
      cell.data = cell.data || [];
      return (cell.data.map(function (img, i) {
        return (<img src={img} key={i} className={cx('img-thumb')}/>)
      }))
    } else {
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
		this.props.dispatch(currentCell(this.props));
		this.props.dispatch(searching(false));
	}

  keyPress (evt) {
    let col = Number(evt.target.id.substr(0,3));
    let row = Number(evt.target.id.substr(3));
    switch (evt.keyCode) {
      case 37:{
							evt.preventDefault();
              this.handleFocus(""+(col-1)+row);
              break;}
      case 38:{
							evt.preventDefault();
              this.handleFocus(""+col+(row-1));
              break;}
      case 39:{
							evt.preventDefault();
              this.handleFocus(""+(col+1)+row);
              break;}
      case 40 || 13:{
							evt.preventDefault();
              this.handleFocus(""+col+(row+1));
              break;}
      default:
        this.editable(evt);
        break;
    }
  }

  handleFocus (selId) {
    // if(document.getElementById(selId)) document.getElementById(selId).focus();
  }

	render () {
    const { cellKey, rowIdx, grid, cell, row } = this.props;
    // if (this.props.cellIdx === 0) {
    //     return (
    //       <div tabIndex='-1' className={cx('cell')} key={this.props.key}
    //         id={''+this.props.cellKey+this.props.rowIdx}
    //         onDoubleClick={this.editable} // allow for cell editing after focus
    //         onKeyDown={this.keyPress} // for key navigation
    //         >
    //         <ContentEditable className={cx('first-cell')}
    //           html={cell.data} // innerHTML of the editable div
    //           disabled={this.state.disabled}       // use true to disable edition
    //           onChange={this.handleChange} // handle innerHTML change
    //           onDoubleClick={this.editable} // allow for cell editing after focus
    //           onMouseEnter={this.setMouseEnter}
    //           onMouseLeave={this.setMouseLeave}
    //         />
    //       </div>
    //     );
    // }

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
