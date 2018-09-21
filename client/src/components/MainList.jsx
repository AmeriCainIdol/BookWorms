import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { BrowserRouter, Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import UserReviewSubmit from './userReviewSubmit.jsx';


export default class MainList extends Component {
  constructor(props) {
    // console.log(props, 'MainList.jsx')
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
    this.componentDidMount = () => {
      document.addEventListener("click", this.closeNav);
    }

    this.componentWillUnmount = () => {
      document.removeEventListener("click", this.closeNav);
    }

    this.openNav = () => {
      const style = { width: 350 };
      this.setState({ style });
      document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
      document.addEventListener("click", this.closeNav);
    }

    this.closeNav = () => {
      document.removeEventListener("click", this.closeNav);
      const style = { width: 0 };
      this.setState({ style });
      document.body.style.backgroundColor = "#F3F3F3";
    }
    const modalStyle = {
      position: 'fixed',
      zIndex: 1040,
      top: 0, bottom: 0, left: 0, right: 0
    };

    const backdropStyle = {
      ...modalStyle,
      zIndex: 'auto',
      backgroundColor: '#000',
      opacity: 0.5
    };

    const dialogStyle= function () {
      // we use some psuedo random coords so nested modals
      // don't sit right on top of each other.
      let top = 50 + rand();
      let left = 50 + rand();

      return {
        position: 'absolute',
        width: 400,
        top: top + '%', left: left + '%',
        transform: `translate(-${top}%, -${left}%)`,
        border: '1px solid #e5e5e5',
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)',
        padding: 20
      };
    };
  }
  

  render() {
    return (

      <div>
        <div className="container">
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
                    {/* <div className="modal"> */}
                      <button type="button" className="btn-group btn btn-success btn-sm" onClick={this.open}>Write Review</button>
                      <p>Click to get the full Modal experience!</p>

                        <Modal
                          aria-labelledby='modal-label'
                          style={this.modalStyle}
                          backdropStyle={this.backdropStyle}
                          show={this.state.showModal}
                          onHide={this.close}
                        >
                        <div style={this.dialogStyle} >
                          <h4 id='modal-label'>Text in a modal</h4>
                          <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
                          <UserReviewSubmit />
                        </div>
                      </Modal>
                    {/* </div> */}
                    {/* <button type="button"
                      className="btn-group btn btn-success btn-sm"
                      role="group"
                      aria-label="..."
                      // onClick={this.linktoUserReview.bind(this)}
                      onClick={this.openNav.bind(this)}>
                     Write Review
                    </button> */}
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
                    <UserReviewSubmit title={this.props.item.title}/>
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

