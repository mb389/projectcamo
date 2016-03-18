import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { updateCell } from 'actions/sheet';
import styles from 'css/components/table';
import { Modal } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';

const cx = classNames.bind(styles);

class Cell extends Component {
	constructor(props, state){
		super(props, state)
		this.state = {showModal: false, html: this.props.cell.data}
		this.close = this.close.bind(this)
		this.open = this.open.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleChange(evt){
  	const { dispatch } = this.props;
    this.setState({html: evt.target.value});
    dispatch(updateCell(evt.target.value, this.props.cellKey, this.props.rowIdx))
  }

  render () {
  	if (this.props.cellIdx === 0) {
  		return (
	      <div className={cx('cell')} key={this.props.key}>
	       	<a className={cx('cell-expand')} onClick={this.open}>
	       		<i className="glyphicon glyphicon-resize-full" />
	       	</a>
	        {this.props.cell.data}
	        <Modal show={this.state.showModal} onHide={this.close}>
		        <Modal.Body>
		        	<div className="input-group">
		          	<input className="form-control" value={this.props.cell.data} />
		          </div>
		        </Modal.Body>
		      </Modal>
	      </div>
	    );
  	}

    return (
    	<ContentEditable className={cx('cell')}
        html={this.state.html} // innerHTML of the editable div
        disabled={false}       // use true to disable edition
        onChange={this.handleChange} // handle innerHTML change
      />
    );
  }
}

Cell.propTypes = {
  dispatch: PropTypes.func
};


export default connect()(Cell);

