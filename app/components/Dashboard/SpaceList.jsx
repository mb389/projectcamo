import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const SpaceList = (props) => {

   const spaces = !this.props.spaces ? [] : this.props.spaces;

   const spacesToDisplay =
   () => {
        <Button>{spaces[0].name}</Button>
    };

    return (
      <div className={cx('spaces')}>
        {spacesToDisplay}
      </div>
    );
  }

export default SpaceList;
