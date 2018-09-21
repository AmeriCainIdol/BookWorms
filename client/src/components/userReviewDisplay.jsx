import React, { Component } from 'react';
import UserReviewSubmit from './userReviewSubmit.jsx';


export default class UserDisplay extends Component {
  constructor(props) {
    super(props);
    console.log(props, 'user display')
  }
  render() {
    return (
      <div >
        <h3>{this.props.title}</h3>
        <dl>
          <dt>
            Rating: {this.props.rating}
          </dt>
        </dl>
        <p>{this.props.reviewText}</p>
      </div>
    )
  }
}