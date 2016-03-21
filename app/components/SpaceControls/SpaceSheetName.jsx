import React, { Component } from 'react';

export default class TagName extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.emitChange = this.emitChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editingName = this.editingName.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML ||
            this.props.disabled !== nextProps.disabled;
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
     this.htmlEl.innerHTML = this.props.html;
    }
  }

  emitChange(e) {
    if (!this.htmlEl) return;
    var html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      e.target = { value: html };
      this.props.onChange(e);
    }
    this.lastHtml = html;
  }

  editingName(e) {
    if (!this.htmlEl) return;
    var html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      e.target = { value: html };
      this.props.onNameChange(e);
    }
    this.lastHtml = html;
  }

  toggleEdit() {
    console.log('toggled')
    this.props.disabled = !this.props.disabled
  }

  render() {
   return React.createElement(
     this.props.tagName || 'div',
     Object.assign({}, this.props, {
       ref: (e) => this.htmlEl = e,
       onInput: this.editingName,
       onBlur: this.emitChange,
       contentEditable: !this.props.disabled,
       dangerouslySetInnerHTML: {__html: this.props.html}
     }),
     this.props.children);
  }
}
