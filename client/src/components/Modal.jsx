import React, { Component } from 'react';
import UserReviewSubmit from './UserReviewSubmit.jsx';

export default class ModalReview extends Component {
  constructor(props) {
    super(props);
    console.log(props, "modal")
    // this.onClose = this.onClose.bind(this);
  }
  
  onClose (e) {
    this.props.onClose && this.props.onClose(e);
  }
  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div>
        <UserReviewSubmit />
        <button onClick={e => {this.onClose(e)}}>x</button>
      </div>
    )
  }
}