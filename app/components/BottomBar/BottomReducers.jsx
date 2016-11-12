import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/bottom-bar';
import { Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';

const cx = classNames.bind(styles);

class BottomReducers extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.state = { selectedReducer: 'Count', reducerReturn: this.reductionFunctionSwitch('Count'), showReducers: false };

    this.generateMenuItems = this.generateMenuItems.bind(this);
    this.handleReduction = this.handleReduction.bind(this);
    this.reductionFunctionSwitch = this.reductionFunctionSwitch.bind(this);
  }

  componentWillMount() {
    if (this.props.columnType === 'Number' || this.props.columnType === 'Formula' || this.props.columnType === 'Checkbox') {
      this.setState({ showReducers: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columnType === 'Number' || nextProps.columnType === 'Formula' || nextProps.columnType === 'Checkbox') {
      this.setState({ showReducers: true });
      this.setState({ reducerReturn: this.reductionFunctionSwitch(this.state.selectedReducer, nextProps.columnData) });
    } else {
      this.setState({ showReducers: false });
    }
  }

  generateMenuItems() {
    return ['Count', 'Sum', 'Average', 'Median', 'Min', 'Max']
      .map((reducer, idx) => (<MenuItem key={idx} eventKey={reducer}>{reducer}</MenuItem>));
  }

  handleReduction(e, ekey) {
    this.setState({ selectedReducer: ekey });
    this.setState({ reducerReturn: this.reductionFunctionSwitch(ekey) });
  }

  reductionFunctionSwitch(func, columnData = this.props.columnData) {
    function rounder(number, places) {
      const tens = Math.pow(10, places);
      return Math.round(number * tens) / tens;
    }
    if (!columnData) return null;
    switch (func) {
      case 'Count': return columnData.reduce((accum, elem) => {if (elem !== 'off') return accum + 1; return accum;}, 0);
      case 'Average': return rounder((columnData.reduce((a, b) => Number(a) + Number(b)) / columnData.length), 2);
      case 'Median': return (columnData.sort((a, b) => Number(a) - Number(b))[Math.floor(columnData.length / 2)]);
      case 'Min': return Math.min.apply(null, columnData);
      case 'Max': return Math.max.apply(null, columnData);
      case 'Sum': return rounder(columnData.reduce((a, b) => Number(a) + Number(b)), 2);
      default: return columnData.reduce((accum, elem) => {if (elem !== 'off') return accum + 1; return accum;}, 0);
    }
  }

  render() {
    return (
      <Dropdown id="dropdown-custom-1" dropup onSelect={this.handleReduction} className={cx('BottomReducers')} style={{ width: this.props.width }}>
        <Dropdown.Toggle noCaret className={cx('DropdownHead')}>
          {this.state.showReducers ? `${this.state.selectedReducer}: ${this.state.reducerReturn}` : ' '}
            {this.state.showReducers ? <Glyphicon className={cx('DropdownCarrat')} glyph="menu-down" /> : ''}
        </Dropdown.Toggle>
        <Dropdown.Menu className={cx('MenuItem')}>
          {this.generateMenuItems()}
        </Dropdown.Menu>
      </Dropdown>
      );
  }
}

export default BottomReducers;
