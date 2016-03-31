import React, {PropTypes, Component} from 'react';
import styles from 'css/components/about';
import classNames from 'classnames/bind';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';

const cx = classNames.bind(styles);

const Footer = (props) => {

    return (
      <div className={cx('footer')}>
        <footer className="text-center">
        <div className={cx("footer-above")}>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>Location</h3>
                        <p>5 Hanover Square, New York, NY</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Around the Web</h3>
                        <ul className="list-inline">
                            <li>
                                <a href="#" className={cx("btn-social")}><i className="fa fa-fw fa-facebook"></i></a>
                            </li>
                            <li>
                                <a href="#" className={cx("btn-social")}><i className="fa fa-fw fa-google-plus"></i></a>
                            </li>
                            <li>
                                <a href="#" className={cx("btn-social")}><i className="fa fa-fw fa-twitter"></i></a>
                            </li>
                            <li>
                                <a href="#" className={cx("btn-social")}><i className="fa fa-fw fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div className={cx("footer-col")}>
                      <div className="col-md-4">
                        <h3>About SpaceBook</h3>
                        <p>SpaceBook aims to recreate the spreadsheet with today's media rich world in mind.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={cx("footer-below")}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                         SpaceBook was created in 2016 at Fullstack Academy
                    </div>
                </div>
            </div>
        </div>
        </footer>
      </div>

    );
  }

export default Footer;
