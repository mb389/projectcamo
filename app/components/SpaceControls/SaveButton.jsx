import React, {Component} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {commit} from 'actions/SpaceControls';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';

const cx = classNames.bind(styles);

class SaveButton extends Component {
  constructor(props, state) {
    super(props, state);
    this.saveSheet = this.saveSheet.bind(this);
  }

  saveSheet() {
    const {dispatch, sheetToShow, sheet} = this.props;
    dispatch(commit(sheetToShow._id, sheet, true));
  }

  render() {
    return (
      <div className={cx('SaveButton')}>
        <Button onClick={this.saveSheet}>
          <Glyphicon glyph="floppy-save" />
        </Button>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sheetToShow: store.spacecontrol.sheetToShow,
    sheet: store.sheet,
  };
}

export default connect(mapStateToProps)(SaveButton);
