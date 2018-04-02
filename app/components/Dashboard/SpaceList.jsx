import React from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import AddSpace from './AddSpace';
import RemoveSpace from './RemoveSpace';
import {Link} from 'react-router';
import folder from 'images/folder.png';

const cx = classNames.bind(styles);

const SpaceList = (props) => {
  const spaces = !props.spaces ? [] : props.spaces;

  const spacesToDisplay = spaces.map((el) => {
    const route = `space/${el._id}`;
    return (
      <div key={el._id} className={`${cx('iconForSheet')} col-xs-6 col-sm-4 col-md-3 col-lg-2`}>
        <RemoveSpace removeSpace={props.removeSpace} space={el} />
        <Link to={route}>
          <img className={cx('icon')} src={folder} />
        </Link>
        <h6> {el.name} </h6>
      </div>
    );
  });

  return (
    <div className={cx('spacesDiv')}>
      <strong>
        Your Spaces <AddSpace createSpace={props.createSpace} />
      </strong>
      <div className={cx('spaces')}>{spacesToDisplay}</div>
    </div>
  );
};

export default SpaceList;
