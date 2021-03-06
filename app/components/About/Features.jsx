import React from 'react';
import styles from 'css/components/about';
import classNames from 'classnames/bind';
import plug from 'images/plugin.png';
import globe from 'images/globe.png';
import stack from 'images/stack.png';

const cx = classNames.bind(styles);

const Features = () => (
      <div className={cx('featureWrap')}>
        <div className={cx('features')}>
          <div className="col-md-4">
            <img src={stack} alt="" />
            <div className={cx('imgText')}>Support for a variety of data types.</div>
          </div>
          <div className="col-md-4">
            <img src={globe} alt="" />
            <div className={cx('imgText')}>Simple spreadsheets with the capabilities of a relational database</div>
              </div>
            <div className="col-md-4">
              <img src={plug} alt="" />
              <div className={cx('imgText')}>Access to external APIs</div>
            </div>
          </div>
        </div>
  );

export default Features;
