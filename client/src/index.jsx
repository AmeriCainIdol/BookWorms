import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import routes from './routes.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Nav1 from './components/Nav1.jsx';
import Nav from './components/Nav.jsx';
import DATA from './mockData';
import REVIEWS from './mockReview';
import axios from 'axios';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import Logout from './containers/Logout.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import Main from './components/Main.jsx';
import Auth from './modules/Auth';
import UserReviewSubmit from './components/userReviewSubmit.jsx';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      Auth.isUserAuthenticated() ? (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location },
        }}
        />
      ) : (
          <Component {...props} {...rest} />
        )
    )}
  />
);

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} {...rest} />
    )}
  />
);
class App extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      items: [],
      reviews: [],
      reviewToggled: false,
      authenticated: false,
      username: null,
      openLibLink: null,
      ebay: null,
    };
    console.log(this.state.username)

    // add function for axios call to ebay
    this.ebaySearch = (title) => {
      axios.get('/ebaybay', {
        params: { title },
      })
        .then((response) => {
          console.log('response.data', response.data);
          // this.setState({ ebay });
        })
        .catch((err) => {
          console.error('error', err);
        });
    };

    this.searchForBook = (title) => {
      axios.get('/googleData', {
        params: { title },
      })
        .then((response) => {
          const items = [response.data];
          const isbn = response.data.ISBN13;
          axios.get('/openLibLink', {
            params: { isbn },
          })
            .then((response) => {
              const openLibLink = response.data.readerLink;
              if (this.state.reviewToggled) {
                this.setState({ reviewToggled: false });
              }
              this.setState({ items, openLibLink });
            });
        })
        .catch((error) => {
          // TODO: tell user there was no result
          console.error(error, 'error in index.jsx');
        });
    };

    this.reviewToggle = (item) => {
      const title = item.title;
      axios.get('/singleReviews', {
        params: { title },
      })
        .then((response) => {
          this.setState({
            reviewToggled: !this.state.reviewToggled,
            items: [item],
            reviews: response.data,
          });
        })
        .catch((error) => {
          console.error(error, 'error in index.jsx 116');
        });
    };

    this.searchByGenre = (genre) => {
      axios.get('/genreTest', {
        params: { genre },
      })
        .then((response) => {
          if (this.state.reviewToggled) {
            this.setState({ reviewToggled: false });
          }
          this.setState({ items: response.data.highRated });
        })
        .catch((error) => {
          console.error(error, 'error in index.jsx 131');
        });
    };

    this.submitReview = (review, rating, item) => {
      // add rating to db
      axios.post('/addRating', rating)
        .then((response) => {
          // add review to db
          axios.post('/addReview', review)
            .then((response) => {
              // update state of reviews with new review
              this.reviewToggle(item);
            });
        })
        .catch((error) => {
          console.error(error, 'error in index.jsx 147');
        });
    };
    this.getTopRated = () => {
      axios.get('/topRated')
        .then((response) => {
          if (this.state.reviewToggled) {
            this.setState({ reviewToggled: false });
          }
          this.setState({ items: response.data.top });
        })
        .catch((error) => {
          console.error(error, 'error in index.jsx 159');
        });
    };
  }

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus();

    axios.get('/topRated')
      .then((response) => {
        this.setState({ items: response.data.top });
      })
      .catch((error) => {
        console.error(error, 'error in index.jsx 173');
      });
    // this.setState({
    //   // items: DATA,
    //   // reviews: REVIEWS,
    // });
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    // set current username if authenticated
    this.setState({ authenticated: Auth.isUserAuthenticated(), username: sessionStorage.getItem('username') });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
            {this.state.authenticated ? (
              <div>
                <Route
                  path="/"
                  render={props => (
                    <Nav
                      {...props}
                      items={this.state.items}
                      reviews={this.state.reviews}
                      reviewToggle={this.reviewToggle.bind(this)}
                      reviewToggled={this.state.reviewToggled}
                      handleSearchInput={this.searchForBook.bind(this)}
                      handleSearchByGenre={this.searchByGenre.bind(this)}
                      handleReviewInput={this.submitReview.bind(this)}
                      username={this.state.username}
                      openLibLink={this.state.openLibLink}
                      handleHomeLink={this.getTopRated.bind(this)}
                      // add link for ebaySearch
                      handleEbaySearchInput={this.ebaySearch.bind(this)}

                    />
                  )}
                />
              </div>
            ) : (
                <Route path="/" render={props => <Nav1 />} />
              )}
            <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage} />
            <Route path="/logout" component={Logout} />
          </div>

        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
