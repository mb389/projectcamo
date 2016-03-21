import styles from 'css/components/dashboard';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {UserProfile} from 'components/Dashboard/UserProfile';
import {SpaceList} from 'components/Dashboard/SpaceList';
import Navigation from 'containers/Navigation';
import * as Actions from '../actions/dashboard';
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

const cx = classNames.bind(styles);

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if (!this.props.spaces) {
      this.props.dispatch(Actions.getSpaces());
    }

  }
  render() {
    return (
      <div>
        <Navigation></Navigation>
        <div className="container">
          <div className={cx('profile')}>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6">
                <div className="well well-sm">
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <img src="http://placehold.it/380x500" alt="" className="img-rounded img-responsive"/>
                    </div>
                    <div className="col-sm-6 col-md-8">
                      <h4>
                        Guy Guyerson</h4>
                      <small>
                        <cite title="San Francisco, USA">San Francisco, USA
                          <i className="glyphicon glyphicon-map-marker"></i>
                        </cite>
                      </small>
                      <p>
                        <i className="glyphicon glyphicon-envelope"></i>&nbsp;email@example.com
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
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6">
                  <div className="well well-sm">
                    Spaces
                    <SpaceList spaces={this.props.spaces}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.user, spaces: state.dashboard.spaces};
}

export default connect(mapStateToProps)(Dashboard);
