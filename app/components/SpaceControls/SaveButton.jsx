import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveSheet } from 'actions/spacecontrols.js';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';


const cx = classNames.bind(styles);

class SaveButton extends Component {
	constructor(props, state){
		super(props, state)
		this.saveSheet = this.saveSheet.bind(this);
	}

	saveSheet(){
		const {dispatch,sheetToShow,sheet} = this.props
		dispatch(saveSheet(sheetToShow._id,sheet))
	}

  render(){
	  return (
	    <div className={cx('SaveButton')}>
	      <Button onClick={this.saveSheet}><Glyphicon glyph="floppy-save" /></Button>
	    </div>
	  );
 	}
}

function mapStateToProps(store) {
  return {
    sheetToShow: store.spacecontrol.sheetToShow,
    sheet: store.sheet
  };
}

export default connect(mapStateToProps)(SaveButton);
