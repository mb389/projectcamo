import React, {PropTypes, Component} from 'react';
import styles from 'css/components/about';
import classNames from 'classnames/bind';
import rocket from 'images/rocket.png'

const cx = classNames.bind(styles);

const FooterBelow = (props) => {

    return (
        <div className={cx("footer-below")}>
          <img src={rocket} height={20} width={20} />  SpaceBook was created in 2016 at Fullstack Academy
        </div>
    );
  }

export default FooterBelow;
