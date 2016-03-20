import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOut } from 'actions/users';
import { Button, Glyphicon } from 'react-bootstrap';

import classNames from 'classnames/bind';
import styles from 'css/components/navigation';

const cx = classNames.bind(styles);

const Navigation = ({ user, dispatch, space }) => {
    return (
      <nav className={cx('navigation')} role="navigation">
        <Link to="dashboard"
          className={cx('item', 'main')}
          activeClassName={cx('active')}><span className={cx('dashboardLink')}> <Glyphicon glyph="menu-left" /> Dashboard</span></Link>
        <div className={cx('item', 'spaceName')}>Sample Space</div>
          { user.authenticated ? (
            <Link onClick={()=> pass}
              className={cx('item', 'logInProfile')} to="/"><Button className={cx('prolifeNav')}></Button></Link>
          ) : (
            <Link className={cx('item', 'main', 'logInProfile')} to="/login"><span className={cx('logInNav')}>Log In</span></Link>
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
