import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import { Button, Glyphicon } from 'react-bootstrap'
const cx = classNames.bind(styles);

const RemoveSpace = props => {
    return (
              <div className={cx("removeButton")}>
                <Button onDoubleClick={props.removeSpace.bind(null,props.space)}
                  bsStyle='danger'
                  bsSize="xsmall">
                <Glyphicon glyph="glyphicon glyphicon-remove"/></Button>
                </div>
    );
  }

export default RemoveSpace;
