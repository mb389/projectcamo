import React, { Component } from 'react';
import FilepickerInput from './filepicker';
import { connect } from 'react-redux';
import { updateModalCell } from 'actions/sheet';
import Slider from 'react-slick';

class ImageList extends Component {
  constructor(props, state) {
    super(props, state);
    this.removeImage = this.removeImage.bind(this);
  }

  removeImage(i) {
    const { dispatch, cellKey, rowIdx } = this.props;
    const newData = this.props.cell.data.slice();
    newData.splice(i, 1);
    dispatch(updateModalCell(newData, cellKey, rowIdx));
  }

  render() {
    const images = this.props.cell.data.map((img, i) => <img key={i} src={img} />);
    const settings = {
      dots: true,
      slidesToShow: 1,
      infinite: false,
      arrows: true,
      initialSlide: 0
    };
    const fileStyle = {
      'z-index': '1100 !important'
    };
    return (
      <div>
        <Slider {...settings}>
          {images}
        </Slider>
        <FilepickerInput style={fileStyle} cellKey={this.props.cellKey} rowIdx={this.props.rowIdx} />
      </div>
    );
  }
}


export default connect()(ImageList);
