import React, { Component } from 'react';

export default class ModalReview extends Component {
  constructor(props) {
    super(props);
    console.log(props, "mdoal")
  }
  render() {
    if (!this.props.showModal) {
      return null;
    }
    return (
      <div>
        Hello World
      </div>
    )
  }
}