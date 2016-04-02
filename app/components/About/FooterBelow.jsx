import React, {PropTypes, Component} from 'react';
import styles from 'css/components/about';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const FooterBelow = (props) => {

    return (
        <div className={cx("footer-below")}>
            SpaceBook was created in 2016 at Fullstack Academy
        </div>
    );
  }

export default FooterBelow;