import React, { PropTypes, Component } from 'react';
import SheetTab from './SheetTab.jsx';
import AddSheetButton from './AddSheetButton.jsx';
import classNames from 'classnames/bind';
import styles from 'css/components/main-section';


const cx = classNames.bind(styles);

const SheetsBar = (props) => {

  // Will need a loop over sheets in space to render the tabs
  return (
    <div>
      {/*Multiple tabs put in while waiting for data*/}
      <SheetTab />
      <SheetTab />
      <AddSheetButton />
    </div>
  );
};


export default SheetsBar;
