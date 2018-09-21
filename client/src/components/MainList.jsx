import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { BrowserRouter, Link } from 'react-router-dom';
import UserDisplay from './userReviewDisplay.jsx';
import ModalReview from './Modal.jsx';


export default class MainList extends Component {
  constructor(props) {
    super(props);


    this.state = {
      reviewInput: null,
      showModal: false
    };

    this.handleSearchClick = (e) => {
      e.preventDefault();
      // const title = this.props.item.title;
      this.props.handleSearchInput(this.props.item.title);
    };
    this.handleReviewClick = (e) => {
      e.preventDefault();
      this.props.reviewToggle(this.props.item);
    };

    //function to link to userReviewSubmit form
    this.linktoUserReview = (e) => {
      e.preventDefault();
      this.props.history('/UserReviewSubmit');
    };
    //bind this to showModal method
    this.showModal = this.showModal.bind(this);
  }
  //create method to display modal
  showModal() {
    this.setState({
      showModal: !this.state.showModal
    })
    console.log('clicked')
  }

  render() {
    return (
      <div>
        <div className="container">
          <ModalReview title={this.props.item.title} onClose={this.showModal} showModal={this.state.showModal} />
          <Card>
            <div className="book-card">
              <div className="media">
                <div className="media-left">
                  <a href="#" onClick={this.handleSearchClick.bind(this)}>
                    <img className="media-object" src={this.props.item.coverImage} alt="book cover" />
                  </a>
                  <div className="btn-group-vertical" role="group" aria-label="...">
                    <button type="button"
                            className="btn-group btn btn-primary btn-sm"
                            role="group"
                            aria-label="..."
                            onClick={this.handleReviewClick.bind(this)}>
                      Bookworms {' '}<span className="badge">{this.props.item.aggregateRating}</span>
                    </button>
                    <button type="button"
                            className="btn-group btn btn-info btn-sm"
                            role="group"
                            aria-label="..."
                            onClick={this.handleReviewClick.bind(this)}>
                      Google Books {' '}<span className="badge">{this.props.item.rating}</span>
                    </button>
                    <button type="button"
                            className="btn-group btn btn-info btn-sm"
                            role="group"
                            aria-label="..."
                            onClick={this.handleReviewClick.bind(this)}>
                      Library Thing {' '}<span className="badge">
                      {this.props.item.libThingRating}</span>
                    </button>
                    <button type="button"
                            className="btn-group btn btn-info btn-sm"
                            role="group"
                            aria-label="..."
                            onClick={this.handleReviewClick.bind(this)}>
                      GoodReads {' '}<span className="badge">{this.props.item.gReadsRating}</span>
                    </button>
                    <button type="button"
                            className="btn-group btn btn-info btn-sm"
                            role="group"
                            aria-label="..."
                            onClick={this.handleReviewClick.bind(this)}>
                      User Rating {' '}<span className="badge">{this.props.item.userRating}</span>
                    </button>
                    <button type="button"
                      className="btn-group btn btn-success btn-sm"
                      role="group"
                      aria-label="..."
                      value="show modal"
                      // onClick={this.linktoUserReview.bind(this)}
                      onClick={this.showModal}>Write Review</button>
                    <button type="button"
                            className="btn-group btn btn-danger btn-sm"
                            role="group"
                            aria-label="..."
                            onClick={this.handleReviewClick.bind(this)}>
                      Review
                      {/* <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span> */}
                    </button>
                  </div>
                </div>
                <div className="media-body">
                  <a href="#" onClick={this.handleSearchClick.bind(this)}>
                    <h4 className="media-heading">{this.props.item.title}</h4>
                  </a>
                  {this.props.item.longDescript}
                  <div>
                    <UserDisplay />
                    {/* <UserReviewSubmit /> */}
                  </div>
                </div>
                <div className="media-right">
                  <ul className="nav nav-pills">

                    {this.props.openLibLink
                      ? <li role="presentation" className="enabled"><a onClick={() => window.open(this.props.openLibLink, '_blank')}>Open Library</a></li>
                      : <div />}
                    {/* <li role="presentation" className="disabled"><a href="#">Open Library</a></li> */}
                    {/* <li role="presentation" className="disabled"><a href="#">Check local library</a></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    );
  }
}

