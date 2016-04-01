
import React, {PropTypes, Component} from 'react';
import styles from 'css/components/about';
import classNames from 'classnames/bind';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import sblogo from 'images/spacebook-logo-nobg.png';

const cx = classNames.bind(styles);

const Features = (props) => {

    return (
      <div className={cx("featureWrap")}>
      <div className={cx('header')}>FEATURES</div>
      <hr className={cx("star-primary")}/>
<div className={cx("features")}>

  <div>
        <img src={sblogo} alt=""/>
      </div>
      <div>
            <img src={sblogo} alt=""/>
          </div>

          <div>
                <img src={sblogo} alt=""/>
              </div>


    </div>

  </div>

  );
}

export default Features;
