import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { closeHistoryModal } from 'actions/sheet';
import styles from 'css/components/modal';
import { Button, Glyphicon } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Slider from 'react-slick';
import Time from 'react-time';

const cx = classNames.bind(styles);

class HistoryModal extends Component {
	constructor(props, state){
		super(props, state)
		this.close = this.close.bind(this)
    this.sheets = this.sheets.bind(this)
    this.mapStateToProps = this.setHistoryTable.bind(this)
	}

	close() {
    this.props.dispatch(closeHistoryModal())
  }

  setHistoryTable(){

  }

  sheets(){
    const divStyle = {
      background: '#00558B',
      color: '#fff',
      padding: '20px 0',
      margin: '10px',
      textAlign: 'center'
    }

    return this.props.history.map(function (sheet, i) {
      return (
          <div style={divStyle}>
            <h6>
              <Time value={sheet.saveDate} format="YYYY/MM/DD HH:mm"/>
            </h6>
            <Button idx={i} ><Glyphicon glyph="eye-open" /> Show past</Button>
          </div>
      )
    })
  }

  historySheet(){
    if (!this.props.historySheet) return <h3>Pick a date...</h3>

    return (
      <Table 
        grid={this.props.historySheet.grid}
        headers={this.props.historySheet.columnHeaders}
      />
    )
  }

  render () {
    if (!this.props.history) return <span></span>

    const settings = {
      dots: true,
      slidesToShow: 3,
      initialSlide: this.props.history.length - 1,
      adaptiveHeight: true,
      infinite: false
    }

    return (
      <Modal show={this.props.showHistoryModal} onHide={this.close} className={cx('modalRow')} dialogClassName={cx('wide-modal')}>
        <Modal.Body>
          <Slider {...settings}>
            {this.sheets()}
          </Slider>
          {this.historySheet()}
        </Modal.Body>
      </Modal>
    );
	}
}


function mapStateToProps(store) {
  return {
    showHistoryModal: store.sheet.showHistoryModal,
    history: store.sheet.history
  };
}

export default connect(mapStateToProps)(HistoryModal);

