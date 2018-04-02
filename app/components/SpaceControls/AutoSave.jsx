import React, {Component} from 'react';
import {connect} from 'react-redux';
import {saveSheet} from 'actions/SpaceControls';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';

const cx = classNames.bind(styles);

class AutoSave extends Component {
  componentDidMount() {
    const {dispatch} = this.props;
    this.saveLoop = setInterval(() => {
      if (this.props.sheet.changed) {
        dispatch(
          saveSheet(this.props.sheetToShow._id, {
            grid: this.props.sheet.grid,
            columnHeaders: this.props.sheet.columnHeaders,
          })
        );
      }
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.saveLoop);
  }

  render() {
    return (
      <div className={cx('SaveButton')}>
        <span />
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

export default connect(mapStateToProps)(AutoSave);
