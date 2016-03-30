import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const UserProfile = props => {

   const user = !props.user ? {profile: {name: "",email: ".@."}} : props.user;
    return (
        <div className={cx('profile')}>
                      <div >
                      <img src="https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png" alt="" className={cx('profImg')} />
                      </div>
                      <div>
                      <h4>Space Monkey</h4>
                      <small>
                        <i className="glyphicon glyphicon-map-marker"></i>
                        <cite >New York, NY</cite>
                      </small>
                      <p>
                        <i className="glyphicon glyphicon-envelope"></i>&nbsp;{props.user.profile.email ? props.user.profile.email : "mo@spacebook.com"}
                        <br/>
                        <i className="glyphicon glyphicon-globe"></i>
                        <a href="/">&nbsp;spacebook.com</a>
                        <br/>
                        <i className="glyphicon glyphicon-gift"></i>&nbsp;June 02, 1922</p>
                    </div>
              </div>
    );
  }

export default UserProfile;
