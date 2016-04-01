
import React, {PropTypes, Component} from 'react';
import styles from 'css/components/about';
import classNames from 'classnames/bind';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import sblogo from 'images/spacebook-logo-nobg.png';
import plug from 'images/plugin.png';
import globe from 'images/globe.png';
import stack from 'images/stack.png'

const cx = classNames.bind(styles);

const Features = (props) => {

    return (
      <div className={cx("featureWrap")}>
      <div className={cx('header')}>FEATURES</div>
      <hr className={cx("star-primary")}/>
<div className={cx("features")}>

  <div>
        <img src={stack} alt=""/>
        Supports a variety of data types.
      </div>
      <div>
            <img src={globe} alt=""/>
            Simple spreadsheets with the capabilities of a relational database.
          </div>

          <div>
                <img src={plug} alt=""/>
                Access to external APIs.
              </div>


    </div>

  </div>

  );
}

export default Features;