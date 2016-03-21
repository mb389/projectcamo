import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import FilepickerInput from './filepicker';
import { connect } from 'react-redux';
import { updateCell } from 'actions/sheet';
import styles from 'css/components/table';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

class ImageList extends Component {
	constructor(props, state){
		super(props, state)
    this.state = {html: this.props.cell.data}
    this.openUpload = this.openUpload.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

  handleChange(evt){
  	const { dispatch, cellKey, rowIdx } = this.props;
    this.setState({html: evt.target.value});
    dispatch(updateCell(evt.target.value, cellKey, rowIdx))
  }

  openUpload(){

  }


  render () {
    const images = this.props.cell.data.map(function (img, i) {
      return (<img src={img} key={i}/>)
    })
    const settings = {
      dots: true
    }
    const fileStyle = {
      'z-index': '1100 !important'
    }
    return (
      <div>
        <Slider {...settings}>
          {images}
        </Slider>
        <FilepickerInput  style={fileStyle}/>
      </div>  
    );
	}
}


export default connect()(ImageList);

