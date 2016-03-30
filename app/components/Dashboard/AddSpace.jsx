import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap'
const cx = classNames.bind(styles);

const AddSpace = props => {
    return (
      <div>
            <Button
              className={cx('addSpace')}
              bsStyle="primary"
              onClick={props.createSpace}
            >
              Add Space
            </Button>
          </div>
    );
  }

export default AddSpace;
