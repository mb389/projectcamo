import React, {PropTypes, Component} from 'react';
import styles from 'css/components/about';
import classNames from 'classnames/bind';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import FooterBelow from './FooterBelow.jsx';

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
                                <a href="http://www.github.com/mb389/projectcamo" className={cx("btn-social")}><i className="fa fa-fw fa-github"></i></a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/FullstackAcademy" className={cx("btn-social")}><i className="fa fa-fw fa-facebook"></i></a>
                            </li>
                          </ul>
                          <ul className="list-inline">
                            <li>
                                <a href="https://www.linkedin.com/in/oscarpenalivhub" className={cx("btn-social")}><i className="fa fa-fw fa-linkedin"></i></a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/apackin" className={cx("btn-social")}><i className="fa fa-fw fa-linkedin"></i></a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/codyschwarz" className={cx("btn-social")}><i className="fa fa-fw fa-linkedin"></i></a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/michaelbushoy" className={cx("btn-social")}><i className="fa fa-fw fa-linkedin"></i></a>
                            </li>

                        </ul>
                    </div>

                      <div className="col-md-4">
                        <h3>About SpaceBook</h3>
                        <p>SpaceBook aims to recreate the spreadsheet with today's media rich world in mind.</p>
                        </div>
                    </div>
                </div>
            </div>
      
        <FooterBelow />
        </footer>
      </div>

    );
  }

export default Footer;
