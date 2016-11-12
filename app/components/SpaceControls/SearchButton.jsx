import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import classNames from 'classnames/bind';
import styles from 'css/components/magic-bar';

const cx = classNames.bind(styles);


const SearchButton = ({ toggleMagicBar, searching }) => (
  <div className={cx('SearchButton')}>
    <Button
      onClick={toggleMagicBar}
      className={searching ? cx('Searching') : cx('')}
    >
      <Glyphicon glyph="search" />
    </Button>
  </div>
);


export default SearchButton;
