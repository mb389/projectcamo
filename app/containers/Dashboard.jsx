
import styles from 'css/components/dashboard';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {UserProfile} from 'components/Dashboard/UserProfile';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

const cx = classNames.bind(styles);

// const Dashboard = (props) => <div>Hi Welcome to the Dashboard. Stay tuned...</div>;

class Dashboard extends Component  {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>Hi!
        </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Dashboard);
