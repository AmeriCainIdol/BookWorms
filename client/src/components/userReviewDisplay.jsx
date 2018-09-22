import React, { Component } from 'react';
import UserReviewSubmit from './userReviewSubmit.jsx';
<<<<<<< HEAD
import axios from 'axios';
=======
>>>>>>> 7d8534a38c3f5298a2d35e1f11489cd2ec3c03d7


export default class UserDisplay extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = {
      reviews: []
    }
    // console.log(props, 'user display')
  }

  // componentDidMount() {
  //   axios.get('/userreviews')
  //     .then(response => {
  //       this.setState({
  //         reviews: response.data
  //       })
  //       console.log(this.state.reviews.title)
  //     })
  // }
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
=======
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
>>>>>>> 7d8534a38c3f5298a2d35e1f11489cd2ec3c03d7
      </div>
    )
  }
}