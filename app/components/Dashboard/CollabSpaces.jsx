import React from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
import { Link } from 'react-router';
import doc from 'images/document.png';

const cx = classNames.bind(styles);

const CollabSpaces = (props) => {
  const collabSpaces = !props.collabSpaces ? [] : props.collabSpaces;

  const collabSpacesToDisplay =
   collabSpaces.map((el) => {
     const route = `space/${el._id}`;
     return (<div key={el._id} className={`${cx('iconForSheet')} col-xs-4 col-sm-4 col-md-3 col-lg-2`}>
                  <Link to={route}>
                    <img className={cx('icon')} src={doc} />
                  </Link>
                <h6> {el.name} </h6>
              </div>);
   });

  return (
      <div className={cx('spacesDiv')}>
        <strong>Spaces Shared With You</strong>
          <div className={cx('spaces')}>
            {collabSpacesToDisplay}
          </div>
      </div>
    );
};

export default CollabSpaces;
