import React from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import { Button, Glyphicon } from 'react-bootstrap';

const cx = classNames.bind(styles);

const AddSpace = ({ createSpace }) => (
  <Button
    className={`${cx('addSpace')} btn-md`}
    bsStyle="primary"
    onClick={createSpace}
  >
    <Glyphicon glyph="glyphicon glyphicon-plus" />
  </Button>
);

export default AddSpace;
