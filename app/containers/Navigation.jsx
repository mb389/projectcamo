import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { Button, Glyphicon, DropdownButton, Dropdown, MenuItem } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import ColumnOptions from '../components/Sheet/ColumnOptions'
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
      <Link to="/dashboard"
      className={cx('item', 'main')}
      activeClassName={cx('active')}><span className={cx('dashboardLink')}> <Glyphicon glyph="menu-left" /> Dashboard</span></Link>
    <ContentEditable className={cx('item', 'spaceName')}
          html={!this.props.space ? 'SpaceBook' : this.props.space.name}
            // innerHTML of the editable div
          disabled={this.props.disabled}     // use true to disable edition
          onChange={this.editSpaceName} // handle innerHTML change
        />
  { this.props.user.authenticated ? (
        <div className={cx('item','logInProfile')}>
        <DropdownButton id='bg-vertical-dropdown-1' title='' bsSize='sm' pullRight={true} noCaret={true} className={cx('profileNav')}>
            <MenuItem key="1" href='/'>Home</MenuItem>
            <MenuItem key="2" href="/dashboard">Dashboard</MenuItem>
            <MenuItem key="4" href='/about'>About SpaceBook</MenuItem>
              <MenuItem divider />
            <MenuItem onSelect={()=> this.props.dispatch(logOut())} key="5">Logout</MenuItem>
          </DropdownButton>
        </div>
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
