import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import Navigation from 'containers/Navigation';
import sadMonkey from 'images/achievement_monkey.png';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = props => {
  return (
    <div>
    <Navigation disabled={true} />
    <div className={cx('about')}>
      <div className={cx('description')}>
        <h1></h1>
        <img width="1200px" height="auto" src="https://cdn.filestackcontent.com/RtKLuovRQBmEvxbC3JOs" alt="" className={cx('logo')} />

        <div className={cx('sadMonkey')}>
        <img width="1000px" height="auto" src={sadMonkey} />
        </div>
        </div>

      <div className={cx('footer')}>(c) SpaceBook, 2016</div>
      </div>
    </div>
  );
};

export default About;
