import styles from 'css/components/dashboard';
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import UserProfile from '../components/Dashboard/UserProfile';
import SpaceList from '../components/Dashboard/SpaceList';
import CollabSpaces from '../components/Dashboard/CollabSpaces';
import Navigation from 'containers/Navigation';
import * as Actions from '../actions/dashboard';
import FooterBelow from 'components/About/FooterBelow';
/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */

const cx = classNames.bind(styles);

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.createSpace = this.createSpace.bind(this)
    this.removeSpace = this.removeSpace.bind(this)
  }

  componentWillMount() {
    if (!this.props.spaces) {
      this.props.dispatch(Actions.getSpaces());
    }
  }

  createSpace() {
    this.props.dispatch(Actions.createSpace(this.props.spaces ? this.props.spaces.length+1 : 1));
  }

  removeSpace(e) {
    this.props.dispatch(Actions.removeSpace(e))
  }

  render() {
    return (
      <div>
        <Navigation link={{path: "/about", name: "About"}} disabled={true} />
        <div className={cx('dashboard')}>
          <SpaceList spaces={this.props.spaces}
            createSpace={this.createSpace} removeSpace={this.removeSpace}/>
          <CollabSpaces collabSpaces={this.props.collabSpaces} />
        </div>
        <FooterBelow />

    </div>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.user, spaces: state.dashboard.spaces, collabSpaces: state.dashboard.collabSpaces};
}

export default connect(mapStateToProps)(Dashboard);
