import React, { PropTypes, Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';


const cx = classNames.bind(styles);

const SearchButton = (props) => {
  return (
    <div className={cx('SearchButton')}>
      <Button><Glyphicon glyph="search" /></Button>
    </div>
  );
};


export default SearchButton;
