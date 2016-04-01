
import React, {PropTypes, Component} from 'react';
import styles from 'css/components/about';
import classNames from 'classnames/bind';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import sblogo from 'images/spacebook-logo-nobg.png';

const cx = classNames.bind(styles);

const Info = (props) => {

    return (
    <div>
      <div className={cx('info')}>
      <div className={cx('header')}>ABOUT</div>
      <hr className={cx("star-primary")}/>
      <div>
        SpaceBook was created at Fullstack Academy in 2016. We aim to recreate the spreadsheet with today's media rich world in mind.
    </div>
  </div>
  <div className={cx('info')}>
    <div className={cx('header')}>CONTACT</div>
    <hr className={cx("star-primary")}/>
    <div>x@y.com</div>
    </div>
  </div>

  );
}

export default Info;
