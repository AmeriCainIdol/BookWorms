import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import axios from 'axios';
import UserDisplay from './userReviewDisplay.jsx';

export default class UserReviewSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      title: '',
      bookTitle: this.props.title,
      reviewText: '',
      rating: 0,
      userReview: []
    }
    this.updateReviewText = this.updateReviewText.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateRating = this.updateRating.bind(this);
    this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
  }
  
  handleReviewSubmit(e) {
    e.preventDefault();
    //create object to store information for review
    const params = {
      title: this.state.title,
      bookTitle: this.state.bookTitle,
      reviewText: this.state.reviewText,
      rating: this.state.rating
    }
    
    console.log(params);
    
    axios.post('/userReviewSubmit', params)
    .then(response => {
      console.log('axios post request from UserReviewSubmit.jsx: ', response);
    })
    .catch(err => {
      console.log('error message from UserReviewSubmit.jsx: ', err);
    })
  }
  
  updateTitle(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value
    }, () => {
      // console.log(this.state.title)
    })
  }  
  
  updateReviewText(e) {
    e.preventDefault();
    this.setState({
      reviewText: e.target.value
    }, () => {
      // console.log(this.state.reviewText)
    })
  }
  
  updateRating(e) {
    e.preventDefault();
    this.setState({
      rating: e.target.id
    }, () => {
      // console.log(this.state.rating)
    })
    .catch(err => {
      console.error(err);
    })
    console.log(this.state.userReview)
  }

  render () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
              <form role="form" onSubmit={this.handleReviewSubmit}>
                <div className="form-group">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="1" onChange={this.updateRating}/>
                    <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
                    <input className="form-check-input" type="checkbox" id="2" onChange={this.updateRating}/>
                    <label className="form-check-label" htmlFor="inlineCheckbox1">2</label>
                    <input className="form-check-input" type="checkbox" id="3" onChange={this.updateRating}/>
                    <label className="form-check-label" htmlFor="inlineCheckbox1">3</label>
                    <input className="form-check-input" type="checkbox" id="4" onChange={this.updateRating}/>
                    <label className="form-check-label" htmlFor="inlineCheckbox1">4</label>
                    <input className="form-check-input" type="checkbox" id="5" onChange={this.updateRating}/>
                    <label className="form-check-label" htmlFor="inlineCheckbox1">5</label>
                  </div>
                  <input  type="text" 
                          className="form-control" 
                          placeholder="Title"
                          style={{width: '400px'}}
                          onChange={this.updateTitle}/>
                  <textarea type="text" 
                            className="form-control" 
                            onChange={this.updateReviewText}
                            placeholder="Write Review...."
                            style={{width: '400px'}}/>
                  <button type="submit" 
                          className="btn btn-success"
                          >Submit Review</button>
                </div>
              </form>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
              <UserDisplay review={this.state.userReview}/>
              </div>
            </div>
          </div>
        </div>
    )
  }
};