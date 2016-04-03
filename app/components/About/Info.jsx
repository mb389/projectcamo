
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
      
  <div className={cx('contact')}>
    <div className={cx('header')}>CONTACT</div>
    <hr className={cx("star-primary")}/>
    <div>x@y.com</div>
    </div>
  </div>

  );
}

export default Info;
