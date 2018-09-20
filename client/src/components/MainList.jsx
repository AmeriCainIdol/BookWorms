import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { BrowserRouter, Link } from 'react-router-dom';
import { Button, Popup } from 'semantic-ui-react';
import UserReviewSubmit from './UserReviewSubmit.jsx';


class MainList extends React.Component {
  constructor(props) {
    // console.log(props, 'MainList.jsx')
    super(props);


    this.state = {
      reviewInput: null
    };
    this.handleSearchClick = (e) => {
      e.preventDefault();
      // const title = this.props.item.title;
      this.props.handleSearchInput(this.props.item.title);
    }
    this.handleReviewClick = (e) => {
      e.preventDefault();
      this.props.reviewToggle(this.props.item);
    }
    this.redirectToUserSubmit = (e) => {
      e.preventDefault();
      this.setState({
        reviewInput: '/UserReviewSubmit'
      }, () => {

        console.log(this.state)
      })
      window.alert('clicked');
    }
  }

  render() {
    return (
      
      <div>
        <div className="container">
        <Card >
          <div className="book-card">
          <div className="media">
            <div className="media-left">
              <a href="#" onClick={this.handleSearchClick.bind(this)}>
                <img className="media-object" src={this.props.item.coverImage} alt="book cover" ></img>
              </a>
              <div className="btn-group-vertical" role="group" aria-label="...">
                <button type="button" className="btn-group btn btn-primary btn-sm" role="group" aria-label="..."
                  onClick={this.handleReviewClick.bind(this)}>
                  Bookworms <span className="badge">{this.props.item.aggregateRating}</span>
                </button>
                <button type="button" className="btn-group btn btn-info btn-sm" role="group" aria-label="..."
                  onClick={this.handleReviewClick.bind(this)}>
                  Google Books <span className="badge">{this.props.item.rating}</span>
                </button>
                <button type="button" className="btn-group btn btn-info btn-sm" role="group" aria-label="..."
                  onClick={this.handleReviewClick.bind(this)}>
                  Library Thing <span className="badge">{this.props.item.libThingRating}</span>
                </button>
                <button type="button" className="btn-group btn btn-info btn-sm" role="group" aria-label="..."
                  onClick={this.handleReviewClick.bind(this)}>
                  GoodReads <span className="badge">{this.props.item.gReadsRating}</span>
                </button>
                <button type="button" className="btn-group btn btn-info btn-sm" role="group" aria-label="..."
                  onClick={this.handleReviewClick.bind(this)}>
                  User Rating <span className="badge">{this.props.item.userRating}</span>
                </button>
                {/* <Link to="/UserReviewSubmit"> */}
                {/* <BrowserRouter>
                  <Link to="/UserReviewSubmit"> */}
                    <button type="button" className="btn-group btn btn-success btn-sm" role="group" aria-label="..."
                      onClick={this.redirectToUserSubmit.bind(this)}>
                      Write Review
                    </button>
                  {/* </Link>
                </BrowserRouter> */}
                {/* </Link> */}
                <button type="button" className="btn-group btn btn-danger btn-sm" role="group" aria-label="..."
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
              <UserReviewSubmit />
            </div>
            <div className="media-right">
              <ul className="nav nav-pills">

                {this.props.openLibLink ?
                  <li role="presentation" className="enabled"><a onClick={() => window.open(this.props.openLibLink, "_blank")} >Open Library</a></li>
                  :  <div />}
                  {/* <UserReviewSubmit /> */}
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

export default MainList;