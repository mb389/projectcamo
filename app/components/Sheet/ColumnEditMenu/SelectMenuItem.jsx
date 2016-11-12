import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../../css/components/menuEditCol';
import { Button, Glyphicon } from 'react-bootstrap';

const cx = classNames.bind(styles);

const SelectMenuItem = (props) => {
  const selectOptions = props.selectOptions.map((opt, idx) => (
    <SelectOption
      key={idx}
      idx={idx}
      value={opt}
      editSelectOption={props.editSelectOption}
      removeSelect={props.removeSelectOption}
    />
  ));
  return (
    <div className="col-xs-12">
      <h5 className="col-xs-12">Allows you to select a single predefined option. </h5>
      <h5> Select Options:</h5>
        {selectOptions}
      <Button
        className={`${cx('addSelectOption')} col-xs-12 btn`}
        onClick={props.addSelectOption}
      >
        <Glyphicon glyph="plus" />
      </Button>
    </div>
  );
};

export default SelectMenuItem;

const SelectOption = (props) => (
    <div>
      <input
        className={`${cx('inputSelectOption')} col-xs-12`}
        value={props.value}
        onChange={props.editSelectOption.bind(this, props.idx)}
      />
      <Glyphicon
        className={`${cx('removeSelectOption')} col-xs-1`}
        glyph="remove"
        onClick={props.removeSelect.bind(this, props.idx)}
      />
    </div>
);
// The bind in onChange adds an extra argument to the end of the function
