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
		this.state = {html: this.props.cell.data}
		this.open = this.open.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.editable = this.editable.bind(this)
		this.setMouseEnter = this.setMouseEnter.bind(this)
		this.setMouseLeave = this.setMouseLeave.bind(this)
	}

	open(){
	// dispatch show modal
	const { dispatch, rowIdx } = this.props;
	dispatch(showRowModal(rowIdx))
	}

	handleChange(evt){
		const { dispatch, cellKey, rowIdx } = this.props;
	this.setState({html: evt.target.value});
	dispatch(updateCell(evt.target.value, cellKey, rowIdx))
	}

  	editable (evt) {
  		this.setState({disabled: false});
  	}

  	setMouseEnter (evt) {
  		evt.target.parentElement.style.backgroundColor = '#e9e9e9';
  	}

  	setMouseLeave (evt) {
  		evt.target.parentElement.style.backgroundColor = '';
  	}

	render () {
		if (this.props.cellIdx === 0) {
	  		return (
		      <div className={cx('cell')} key={this.props.key}>
		       	<a className={cx('cell-expand')} onClick={this.open}>
		       		<i className="glyphicon glyphicon-resize-full" />
		       	</a>
		        <ContentEditable className={cx('cell', 'first-cell')}
	            html={this.state.html} // innerHTML of the editable div
	            disabled={false}       // use true to disable edition
	            onChange={this.handleChange} // handle innerHTML change
	          />
		      </div>
		    );
  	}

    return (
    	<ContentEditable className={cx('cell')}
        html={this.state.html} // innerHTML of the editable div
        disabled={this.state.disabled}       // use true to disable edition
        onChange={this.handleChange} // handle innerHTML change
        onDoubleClick={this.editable} // allow for cell editing after focus
        onMouseEnter={this.setMouseEnter} // handle innerHTML change 
        onMouseLeave={this.setMouseLeave} // handle innerHTML change 
      />
    );
  }
}

Cell.propTypes = {
  dispatch: PropTypes.func
};


export default connect()(Cell);

