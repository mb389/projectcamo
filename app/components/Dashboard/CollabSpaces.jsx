import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import AddSpace from './AddSpace'
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';

const cx = classNames.bind(styles);

const CollabSpaces = (props) => {

   const collabSpaces = !props.collabSpaces ? [] : props.collabSpaces;

   const collabSpacesToDisplay =
   collabSpaces.map((el) => {
     const route=`space/${el._id}`;
      return <div key={el._id}><Glyphicon glyph="th-list" />&nbsp;&nbsp;&nbsp;
    <Link to={route}>{el.name}</Link></div>

    });

    return (
      <div className={cx('spaces')}>
        <strong>Spaces Shared With You</strong>
        {collabSpacesToDisplay}
  </div>

    );
  }

export default CollabSpaces;
