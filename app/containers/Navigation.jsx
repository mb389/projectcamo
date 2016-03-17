import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { Button } from 'react-bootstrap'

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({user, dispatch, }) => {
    return (
      <nav className={cx('navigation')} role="navigation">
        <Link to="dashboard"
          className={cx('item', 'main')}
          activeClassName={cx('active')}>Main</Link>
        <div className={cx('item', 'spaceName')}>Space Name</div>
          { user.authenticated ? (
            <Link onClick={()=> pass}
              className={cx('item', 'logInProfile')} to="/">Profile</Link>
          ) : (
            <Link className={cx('item', 'logInProfile')} to="/login">Log in</Link>
          )}
      </nav>
    );
};


Navigation.propTypes = {
  user: PropTypes.object,
  workSpaceName: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(store) {
  return {
    user: store.user
    // spaceName: store.space.name
  };
}

export default connect(mapStateToProps)(Navigation);
