import React, { Component } from 'react';
import UserReviewSubmit from './UserReviewSubmit.jsx';


const modalStyle = {
  position: 'fixed',
  zIndex: 1040,
  top: 50, bottom: 50, left: 50, right: 50,
  width: 350,
  height: 400
};

const backdropStyle = {
  ...modalStyle,
  zIndex: 'auto',
  backgroundColor: '#000',
  opacity: 0.5
};

export default class ModalReview extends Component {
  constructor(props) {
    super(props);
    // console.log(props, "modal")
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
      <div style={backdropStyle}>
        <div style={modalStyle}>
          <UserReviewSubmit title={this.props.title}/>
          <button onClick={e => {this.onClose(e)}}>x</button>
        </div>
      </div>
    )
  }
}