import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import { Button, Glyphicon } from 'react-bootstrap'
const cx = classNames.bind(styles);

const AddSpace = props => {
    return (
      <div>
            <Button
              className={cx('addSpace') + ' btn-lg'}
              bsStyle="primary"
              onClick={props.createSpace}
            >
               <Glyphicon glyph="glyphicon glyphicon-plus" />
            </Button>
          </div>
    );
  }

export default AddSpace;
