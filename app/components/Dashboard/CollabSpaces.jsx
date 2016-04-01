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
      return <div key={el._id} className={cx('iconForSheet') + ' col-xs-4'}>
                <Link to={route}>
                  <Glyphicon glyph="glyphicon glyphicon-folder-open" />
                </Link>
                {el.name}
              </div>

    });

    return (
      <div className={cx('spacesDiv')}>
        <strong>Spaces Shared With You</strong>
          <div className={cx('spaces')}>
            {collabSpacesToDisplay}
          </div>
      </div>
    );
  }

export default CollabSpaces;
