import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = props => {
  return (
    <div className={cx('about')}>
      <h1 className={cx('header')}>About CAMO</h1>
      <div className={cx('description')}>
        <p>SHEETS!
        </p>
      </div>
    </div>
  );
};

export default About;
