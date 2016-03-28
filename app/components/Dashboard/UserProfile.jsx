import React, {PropTypes, Component} from 'react';
import styles from 'css/components/dashboard';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const UserProfile = props => {

   const user = !props.user ? {profile: {name: "",email: ".@."}} : props.user;
    return (
          <div className={cx('profile')}>
              <div className="col-md-6">
                <div className="well well-sm">
                  <div className="row">
                      <div className="col-md-4">
                      <img src="https://cdn3.iconfinder.com/data/icons/rcons-user-action/32/boy-512.png" alt="" className={cx('profImg')} /></div>
                      <div className="col-md-4">
                      <h4>
                        {props.user.profile.name}</h4>
                      <small>
                        <cite title="San Francisco, USA">San Francisco, USA
                          <i className="glyphicon glyphicon-map-marker"></i>
                        </cite>
                      </small>
                      <p>
                        <i className="glyphicon glyphicon-envelope"></i>&nbsp;{props.user.profile.email}
                        <br/>
                        <i className="glyphicon glyphicon-globe"></i>
                        <a href="/">&nbsp;www.website.com</a>
                        <br/>
                        <i className="glyphicon glyphicon-gift"></i>&nbsp;June 02, 1988</p>
                      <div className="btn-group">
                        <button type="button" className="btn btn-primary">
                          Social</button>
                        <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                          <span className="caret"></span>
                          <span className="sr-only">Social</span>
                        </button>
                        <ul className="dropdown-menu" role="menu">
                          <li>
                            <a href="#">Twitter</a>
                          </li>
                          <li>
                            <a href="https://plus.google.com/+Jquery2dotnet/posts">Google +</a>
                          </li>
                          <li>
                            <a href="https://www.facebook.com/jquery2dotnet">Facebook</a>
                          </li>
                          <li className="divider"></li>
                          <li>
                            <a href="#">Github</a>
                          </li>
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
    );
  }

export default UserProfile;
