import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/table';

const cx = classNames.bind(styles);

const OtherMenuItem = (props) => {
	return (
	    <div className='col-md-12'>
			<p className='col-md-12'>{props.description}</p>
		</div>
		);
}

export default OtherMenuItem;