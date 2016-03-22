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
      return <div key={el._id}><Glyphicon glyph="glyphicon glyphicon-folder-open" />
    <Link to={route}>&nbsp;&nbsp;&nbsp;{el.name}</Link></div>

    });

    return (
        <div className="col-md-6">
          <div className="well well-sm">
      <div className={cx('spaces')}>
        <strong>Spaces</strong>
        {spacesToDisplay}
      </div>
  </div>
  </div>
    );
  }

export default SpaceList;
