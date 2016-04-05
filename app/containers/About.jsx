import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import Navigation from 'containers/Navigation';
import Footer from 'components/About/Footer';
import Features from 'components/About/Features';
import logo from 'images/SpaceBook.png'
import space from 'images/hero-bg-01.jpg'
const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = props => {
  return (
    <div>
    <Navigation class={'splashNav'} disabled={true}  />
    <div className={cx('aboutpg')}>
      <div className={cx('description')}>
        <img width="800px" height="auto" src={logo} alt="SpaceBook Logo" className={cx('logo')} />

        </div>
        <Features />
        <Footer />

      </div>

    </div>
  );
};

export default About;
