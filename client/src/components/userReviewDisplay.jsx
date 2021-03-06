import React, { Component } from 'react';
import UserReviewSubmit from './userReviewSubmit.jsx';
import axios from 'axios';


export default class UserDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: []
    }
  }
  
  render() {
    return (
      <div >
        <h3>{this.state.reviews.title}</h3>
        <dl>
          <dt>
            Rating: {this.state.reviews.rating}
          </dt>
        </dl>
        <p>{this.state.reviews.reviewText}</p>
      </div>
    )
  }
}