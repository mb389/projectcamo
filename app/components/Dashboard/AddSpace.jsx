import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap'
const cx = classNames.bind(styles);

const AddSpace = props => {

    return (
            <Button
              className={cx('addSpace')}
              onClick={props.createSpace}
            >
              Add Space
            </Button>
    );
  }

export default AddSpace;
