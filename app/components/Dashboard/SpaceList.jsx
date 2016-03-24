import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';

const cx = classNames.bind(styles);

const SpaceList = (props) => {

   const spaces = !props.spaces ? [] : props.spaces;

   const spacesToDisplay =
   spaces.map((el) => {
     const route=`space/${el._id}`;
      return <div key={el._id}><Glyphicon glyph="glyphicon glyphicon-folder-open" />&nbsp;&nbsp;&nbsp;
    <Link to={route}>{el.name}</Link></div>

    });

    return (
      <div className={cx('spaces')}>
          <div className="well well-sm">
        <strong>Spaces</strong>
        {spacesToDisplay}
      </div>
  </div>
    );
  }

export default SpaceList;
