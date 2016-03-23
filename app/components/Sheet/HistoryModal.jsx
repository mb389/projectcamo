import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { closeHistoryModal, setHistoryTable } from 'actions/sheet';
import { addSheet } from 'actions/SpaceControls';
import styles from 'css/components/modal';
import { Button, Glyphicon } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Slider from 'react-slick';
import Time from 'react-time';
import Table from 'components/Sheet/Table';

const cx = classNames.bind(styles);

class HistoryModal extends Component {
	constructor(props, state){
		super(props, state)
		this.close = this.close.bind(this)
    this.sheets = this.sheets.bind(this)
    this.setHistoryTable = this.setHistoryTable.bind(this)
    this.restoreSheet = this.restoreSheet.bind(this)
	}

	close() {
    this.props.dispatch(closeHistoryModal())
  }

  setHistoryTable(i){
    this.props.dispatch(setHistoryTable(i))
  }

  restoreSheet(sheet){
    this.props.dispatch(addSheet(this.props.space._id,sheet))
    this.close()
  }

  sheets(){
    const divStyle = {
      background: '#00558B',
      color: '#fff',
      padding: '20px 0',
      margin: '10px',
      textAlign: 'center'
    }
    let self = this

    return this.props.history.map(function (sheet, i) {
      return (
          <div style={divStyle} key={i}> 
            <h6>
              <Time value={sheet.saveDate} format="YYYY/MM/DD HH:mm"/>
            </h6>
            <Button onClick={self.setHistoryTable.bind(null, i)} ><Glyphicon glyph="eye-open" /> Show past</Button>
            <Button onClick={self.restoreSheet.bind(null, sheet)} ><Glyphicon glyph="scissors" /> Restore</Button>
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
        disableAll={true}
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
          <div>
            {this.historySheet()}
          </div>
        </Modal.Body>
      </Modal>
    );
	}
}


function mapStateToProps(store) {
  return {
    showHistoryModal: store.sheet.showHistoryModal,
    history: store.sheet.history,
    historySheet: store.sheet.historySheet,
    space: store.spacecontrol.space
  };
}

export default connect(mapStateToProps)(HistoryModal);

