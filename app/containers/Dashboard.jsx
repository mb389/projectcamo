import styles from 'css/components/dashboard';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import UserProfile from '../components/Dashboard/UserProfile';
import SpaceList from '../components/Dashboard/SpaceList';
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
        <Navigation disabled={true} />
        <UserProfile user={this.props.user} />
        <SpaceList spaces={this.props.spaces} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.user, spaces: state.dashboard.spaces};
}

export default connect(mapStateToProps)(Dashboard);
