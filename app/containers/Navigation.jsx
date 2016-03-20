import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { Button, Glyphicon } from 'react-bootstrap';
import * as Actions from '../actions/navigation';
// import TagName from '../components/SpaceControls/SpaceSheetName';
import ContentEditable from 'react-contenteditable';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);


class Navigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.editSpaceName = this.editSpaceName.bind(this);
    // this.onNameChange = this.onNameChange.bind(this);
  }

  editSpaceName(e) {
    this.props.dispatch(Actions.changeSpaceName(this.props.space._id, e.target.value));
  }

  render() {
    return (
      <nav className={cx('navigation')} role="navigation">
      <Link to="dashboard"
      className={cx('item', 'main')}
      activeClassName={cx('active')}><span className={cx('dashboardLink')}> <Glyphicon glyph="menu-left" /> Dashboard</span></Link>
      <ContentEditable className={cx('item', 'spaceName')}
          html={!this.props.space ? 'Loading' : this.props.space.name}
            // innerHTML of the editable div
          disabled={false}     // use true to disable edition
          onChange={this.editSpaceName} // handle innerHTML change
        />
  { this.props.user.authenticated ? (
        <Link onClick={()=> pass}
        className={cx('item', 'logInProfile')} to="/"><Button className={cx('prolifeNav')}></Button></Link>
      ) : (
        <Link className={cx('item', 'main', 'logInProfile')} to="/login"><span className={cx('logInNav')}>Log In</span></Link>
      )}
      </nav>
      );
    }
}


Navigation.propTypes = {
  workSpaceName: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    user: store.user,
    space: store.spacecontrol.space
  };
}

export default connect(mapStateToProps)(Navigation);
