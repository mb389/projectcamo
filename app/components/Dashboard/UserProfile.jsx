import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);
import spacebookLogo from 'images/spacebook-logo-nobg.png';

const UserProfile = props => {

   const user = !props.user ? {} : props.user;
    return (
        <div className={cx('profile')}>
                      <div >
                      <img src={spacebookLogo} alt="" className={cx('profImg')} />
                      </div>
                      <div>
                        <div className={cx('profile')}>
                      <h4>Space Monkey</h4>
                      <small>
                        <i className="glyphicon glyphicon-map-marker"></i>
                        <cite >New York, NY</cite>
                      </small>
                      <p>
                        <i className="glyphicon glyphicon-envelope"></i>{props.user.email ? props.user.email : "mo@spacebook.com"}
                        <br/>
                        <i className="glyphicon glyphicon-globe"></i>
                        <a href="/">spacebook.com</a>
                        <br/>
                        <i className="glyphicon glyphicon-gift"></i>June 02, 1922</p>
                    </div>
                  </div>
              </div>
    );
  }

export default UserProfile;
