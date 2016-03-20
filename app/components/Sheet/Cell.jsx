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
    this.openModal = this.openModal.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

  openModal(){
    // dispatch show modal
    const { dispatch, rowIdx } = this.props;
    dispatch(showRowModal(rowIdx))
  }

  handleChange(evt){
  	const { dispatch, cellKey, rowIdx } = this.props;
    this.setState({html: evt.target.value});
    dispatch(updateCell(evt.target.value, cellKey, rowIdx))
  }

  render () {
  	if (this.props.cellIdx === 0) {
  		return (
	      <div className={cx('cell')} key={this.props.key}>
	       	<a className={cx('cell-expand')} onClick={this.openModal}>
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

    if (this.props.cell.type === 'url') {
      // make this a nice link somehow or add a glyiphicon to follow
      return (
        <ContentEditable className={cx('cell')}
          html={this.state.html} // innerHTML of the editable div
          disabled={false}       // use true to disable edition
          onChange={this.handleChange} // handle innerHTML change
        />
      )
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

function mapStateToProps(store) {
  return {
    grid: store.sheet.grid
  };
}


export default connect(mapStateToProps)(Cell);

