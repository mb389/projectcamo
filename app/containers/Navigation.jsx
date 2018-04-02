import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {logOut} from 'actions/users';
import {Glyphicon, DropdownButton, MenuItem} from 'react-bootstrap';
import * as Actions from '../actions/navigation';
import ContentEditable from 'react-contenteditable';
import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

class Navigation extends Component {
  constructor(props, context) {
    super(props, context);
    this.editSpaceName = this.editSpaceName.bind(this);
    this.state = {name: 'SpaceBook'};
    this.getName = this.getName.bind(this);
  }

  componentDidMount() {
    this.getName();
  }

  componentWillReceiveProps() {
    if (this.state.name === 'SpaceBook') this.getName();
  }

  getName() {
    if (this.props.sheet.grid && this.props.space) {
      this.setState({name: this.props.space.name});
    } else {
      this.setState({name: 'SpaceBook'});
    }
  }

  editSpaceName(e) {
    this.setState({name: e.target.value});
    this.props.dispatch(Actions.changeSpaceName(this.props.space._id, e.target.value));
  }

  render() {
    return (
      <nav className={cx('navigation')} role="navigation">
        {this.props.user.authenticated ? (
          <Link
            to={this.props.link ? this.props.link.path : '/dashboard'}
            className={cx('item', 'main')}
            activeClassName={cx('active')}
          >
            <span className={cx('dashboardLink')}>
              <Glyphicon glyph="menu-left" />
              {this.props.link ? this.props.link.name : 'Dashboard'}
            </span>
          </Link>
        ) : (
          ''
        )}
        <ContentEditable
          className={cx('item', 'spaceName')}
          html={this.state.name} // innerHTML of the editable div
          disabled={this.props.disabled} // use true to disable edition
          onChange={this.editSpaceName}
        />
        {this.props.user.authenticated ? (
          <div className={cx('item', 'logInProfile')}>
            <DropdownButton
              id="bg-vertical-dropdown-1"
              title=""
              bsSize="sm"
              pullRight
              noCaret
              className={cx('profileNav')}
            >
              <MenuItem key="1" href="/about">
                About
              </MenuItem>
              <MenuItem key="2" href="/dashboard">
                Dashboard
              </MenuItem>
              <MenuItem divider />
              <MenuItem onSelect={() => this.props.dispatch(logOut())} key="3">
                Logout
              </MenuItem>
            </DropdownButton>
          </div>
        ) : (
          <Link className={cx('item', 'main', 'logInProfile')} to="/login">
            <span className={cx('logInNav')}>Log In</span>
          </Link>
        )}
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    space: store.spacecontrol.space,
    sheet: store.sheet,
  };
}

export default connect(mapStateToProps)(Navigation);
