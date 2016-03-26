import React, { PropTypes, Component } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/bottom-bar';
import { DropdownButton, Glyphicon, Dropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';



const cx = classNames.bind(styles);

function generateColumnReducers (columns) {
  return columns.map((column) => {
      return (
          <BottomReducers column={column} key={column.id}/>
          // component of dropdown for reducers;
      )
  })
}

const BottomBar = (props) => {
	console.log('props', props);
  return (
    <div className={cx('BottomBar')} >
      <div className={cx('BottomRowCount')}>
        <span >{props.rows} rows</span>
      </div>
        {generateColumnReducers(props.columns)}
    </div>
  );
};


export default BottomBar;


class BottomReducers extends Component {
	constructor(props,state){
		super(props, state);
		this.state = {};

		this.generateMenuItems = this.generateMenuItems.bind(this);
		this.handleReduction = this.handleReduction.bind(this);
	}

	generateMenuItems () {
		return ['Sum','Average','Median','Min','Max'].map((reducer, idx) => {
			return (<MenuItem key={idx} eventKey={reducer}>{reducer}</MenuItem>);
			// reducer : {output of reducer}
		})
	}

	handleReduction (e, ekey) {
		console.log('handleReduction', e, ekey);
		// this.setState({type: ekey});
	}

	render () {
		return (
			<Dropdown id="dropdown-custom-1" dropup onSelect={this.handleReduction} className={cx('BottomReducers')}>
			  <Dropdown.Toggle noCaret className={cx('DropdownHead')}>
			    {this.props.column.name}
						<Glyphicon className={cx('DropdownCarrat')} glyph="menu-down" />
			  </Dropdown.Toggle>
			  <Dropdown.Menu className={cx('MenuItem')}>
			  	{this.generateMenuItems()}
			  </Dropdown.Menu>
			</Dropdown>
			)
	}
}

// Sum: 
// Average:
// Median:
// Min:
// Max:

// sum() { Array.reduce(function(a, b) { return a + b; });
// 		let dupFn = function (a, b) {
// 			return a+b;
// 		};
// 		this.props.dispatch(formulaColumn('reduce', dupFn, this.props.column));
// 	}

// 		<div className={cx('BottomReducers')} key={props.column.id}>{props.column.name}</div>

// <Dropdown id="dropdown-custom-1" onSelect={this.handleReduction} className={cx('BottomReducers')}>
//   <Dropdown.Toggle noCaret className={cx('DropdownHead')}>
//     {props.column.name}
// 			<Glyphicon className={cx('DropdownCarrat')} glyph="menu-down" />
//   </Dropdown.Toggle>
//   <Dropdown.Menu className={cx('MenuItem')}>
//   	{generateMenuItems()}
//   </Dropdown.Menu>
// </Dropdown>)

// const Headers = (props) => {
//   return (
//       <div className={cx('theaders')}>
//         <div className={cx('topCorner')} />
//         <div className={cx('topCorner')}></div>
//         {generateColumnOptions(props.headers)}
//         <AddColumn />
//       </div>
//     );
// }
