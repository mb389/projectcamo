import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';


const cx = classNames.bind(styles);

class AddSheetButton extends Component {
  constructor(props) {
    super(props);
    this.addSheet = this.addSheet.bind(this);
  }

  addSheet() {
    // this.props.dispatch();
    // dispatch action to create a new sheet in mongo
    console.log('addingSheet');
  }

  render() {
    return (
      <button className={cx('AddSheetButton', 'SheetButton')} onClick={this.addSheet}>+</button>
    );
  }

}


export default connect()(AddSheetButton);
