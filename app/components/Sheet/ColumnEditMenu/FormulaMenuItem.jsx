import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';
import { Glyphicon, Dropdown, MenuItem } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';
import AceEditor from 'react-ace';

// prevent error when server tries to render
if (typeof window !== 'undefined') {
  require('brace/mode/javascript');
  require('brace/theme/kuroir');
}

const cx = classNames.bind(styles);

const FormulaMenuItem = (props) => {
  function createFunctionList() {
    return props.formulas.map((elem, idx) => (
      <MenuItem key={idx} eventKey={elem.functionStr} >
        {elem.name}
        <Glyphicon
          className={cx('removeFunction')}
          onClick={props.formulaRemove.bind(null, elem._id)}
          glyph="glyphicon glyphicon-remove"
        />
      </MenuItem>
    ));
  }

  function functionSelected(e, ekey) {
    props.handleFormulaCustom(null, ekey);
    props.handleFormulaNameChange(e);
  }

  return (
    <div className="col-xs-12">
      <h5 className="col-xs-12">Write your own Javascript formula e.g. Initials below</h5>
      <Dropdown id="dropdown-custom-1" onSelect={functionSelected} className={`${cx('typeDropdown')} col-xs-12'`}>
        <Dropdown.Toggle noCaret className=" col-xs-12">
          {props.formulaName}
          <Glyphicon className={cx('columnCarrat')} glyph="menu-down" />
        </Dropdown.Toggle>
        <Dropdown.Menu className={cx('columnMenu')}>
          {createFunctionList()}
        </Dropdown.Menu>
      </Dropdown>
      <label className="col-xs-4">Name:</label>
      <ContentEditable
        className="col-xs-8"
        id="handleFormulaNameChange"
        style={{ backgroundColor: 'white' }}
        onChange={props.handleFormulaNameChange}
        html={props.formulaName}
      />
      <AceEditor
        mode="javascript"
        width="250px"
        height="100px"
        theme="kuroir"
        showGutter={false}
        enableBasicAutocompletion
        tabSize="2"
        onChange={props.handleFormulaCustom}
        name="UNIQUE_ID_OF_DIV"
        value={props.formula}
        editorProps={{ $blockScrolling: true }}
      />
      <button
        className="btn col-xs-8 col-xs-offset-4"
        type="button" onClick={props.formulaUpload}
      >
        Upload Formula
      </button>
    </div>
  );
};

export default FormulaMenuItem;
