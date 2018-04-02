import React from 'react';
import {connect} from 'react-redux';
import {updateModalCell} from 'actions/sheet';

class FilepickerInput extends React.Component {
  constructor(props, state) {
    super(props, state);
    this.handleChangeFileUrl = this.handleChangeFileUrl.bind(this);
  }

  componentDidMount() {
    const filepickerElement = this.refs.filepicker;
    if (typeof filepicker !== 'undefined') {
      // Single-page app integration: https://developers.filepicker.com/docs/support/integration/117
      filepicker.constructWidget(filepickerElement);
    }
    filepickerElement.addEventListener('change', this.handleChangeFileUrl, false);
  }

  componentWillUnmount() {
    this.refs.filepicker.removeEventListener('change', this.handleChangeFileUrl, false);
  }

  handleChangeFileUrl(evt) {
    this.props.dispatch(
      updateModalCell(evt.target.value, this.props.cellKey, this.props.rowIdx, true)
    );
  }

  render() {
    return (
      <input
        data-fp-apikey="ACRQlXxYvQvWW0aclugElz"
        ref="filepicker"
        type="filepicker"
        id="fpOverlay"
      />
    );
  }
}

export default connect()(FilepickerInput);
