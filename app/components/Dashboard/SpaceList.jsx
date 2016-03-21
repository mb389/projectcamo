import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import {Link} from 'react-router';

const cx = classNames.bind(styles);

const SpaceList = (props) => {

   const spaces = !props.spaces ? [] : props.spaces;

   const spacesToDisplay =
   spaces.map((el) => {
     const route=`space/${el._id}`;
      return  <li key={el.name}><Link to={route}>{el.name}</Link></li>
    });

    return (
        <div className="col-xs-12 col-sm-6 col-md-6">
          <div className="well well-sm">
      <div className={cx('spaces')}>
        Spaces
        <ul>
        {spacesToDisplay}
        </ul>
      </div>
    </div>
  </div>
    );
  }

export default SpaceList;
