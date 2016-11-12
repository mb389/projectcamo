import styles from 'css/components/dashboard';
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
// import UserProfile from '../components/Dashboard/UserProfile';
import SpaceList from '../components/Dashboard/SpaceList';
import CollabSpaces from '../components/Dashboard/CollabSpaces';
import Navigation from 'containers/Navigation';
import * as Actions from '../actions/dashboard';
import FooterBelow from 'components/About/FooterBelow';


const cx = classNames.bind(styles);

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    this.createSpace = this.createSpace.bind(this);
    this.removeSpace = this.removeSpace.bind(this);
  }

  componentWillMount() {
    if (!this.props.spaces) {
      this.props.dispatch(Actions.getSpaces());
    }
  }

  createSpace() {
    this.props.dispatch(Actions.createSpace(this.props.spaces ? this.props.spaces.length + 1 : 1));
  }

  removeSpace(e) {
    this.props.dispatch(Actions.removeSpace(e));
  }

  render() {
    return (
      <div>
        <Navigation class={'navigation'} link={{ path: '/about', name: 'About' }} disabled />
        <div className={cx('dashboard')}>
          <SpaceList
            spaces={this.props.spaces}
            createSpace={this.createSpace}
            removeSpace={this.removeSpace}
          />
          <CollabSpaces collabSpaces={this.props.collabSpaces} />
        </div>
        <FooterBelow />

    </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    spaces: state.dashboard.spaces,
    collabSpaces: state.dashboard.collabSpaces
  };
}

export default connect(mapStateToProps)(Dashboard);
