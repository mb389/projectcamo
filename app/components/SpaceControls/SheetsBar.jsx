import React, { PropTypes, Component } from 'react';
import SheetTab from './SheetTab.jsx';
import AddSheetButton from './AddSheetButton.jsx';
import classNames from 'classnames/bind';
import styles from 'css/components/space-control';


const cx = classNames.bind(styles);

const SheetsBar = (props) => {
  // to be replace with real sheets fed in via props
  const sheets = [{name:"Test1"}, {name:"Test2"}]

  const sheetsToView = sheets.map((sheetForTab, i) => <SheetTab key={i} sheet={sheetForTab} />)

  // Will need a loop over sheets in space to render the tabs
  return (
    <div className={cx('SheetsBar')}>
      {sheetsToView}
      <AddSheetButton />
    </div>
  );
};


export default SheetsBar;
