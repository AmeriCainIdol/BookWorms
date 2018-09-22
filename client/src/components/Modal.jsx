import React, { Component } from 'react';
import UserReviewSubmit from './UserReviewSubmit.jsx';
import axios from 'axios';

const modalStyle = {
  position: 'relative',
  margin: '0 auto',
  maxWidth: 600,
  maxHeight: 300,
  padding: 30
};

const backdropStyle = {
  ...modalStyle,
  position: 'fixed',
  top: 0, bottom: 0, left: 0, right: 0,
  zIndex: 'auto',
  backgroundColor: '	#C0C0C0',
  padding: 50
};

export default class ModalReview extends Component {
  constructor(props) {
    super(props);
    // console.log(props, "modal")
    // this.onClose = this.onClose.bind(this);
    this.state = {
      userReview: []
    }
  }
  
  onClose (e) {
    this.props.onClose && this.props.onClose(e);
  }

  componentDidMount() {
    axios.get('/userreviews')
      .then(response => {
        console.log(response, 'line 74');
        this.setState({ userReview: response.data }, () => {
        })
      })
      .catch(err => {
        console.error(err);
      })
    console.log(this.state.userReview)
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