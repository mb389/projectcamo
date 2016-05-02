import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { showHistoryModal } from 'actions/sheet.js';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';

const cx = classNames.bind(styles);

class HistoryButton extends Component {
	constructor(props, state){
		super(props, state)
		this.showHistoryModal = this.showHistoryModal.bind(this);
	}

	showHistoryModal(){
		const {dispatch} = this.props
		dispatch(showHistoryModal())
	}

  render(){
  	if (!this.props.history || !this.props.history.size) return <span></span>
	  return (
	    <div className={cx('HistoryButton')}>
	      <Button onClick={this.showHistoryModal}><Glyphicon glyph="backward" /></Button>
	    </div>
	  );
 	}
};

function mapStateToProps(store) {
	return {
		history: store.sheet.get('history')
	}
}

export default connect(mapStateToProps)(HistoryButton);
