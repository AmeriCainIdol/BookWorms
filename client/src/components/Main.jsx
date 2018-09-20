import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import $ from 'jquery';
import MainList from './MainList.jsx';


export default class Main extends Component {
  constructor(props) {
    // super(props);
    console.log(props, 'Main.jsx')
    super(props);
  }
  render() {

    return (
    <div>
    
      {/* toggle between Recomendations and Favorites */}
      <div className="container">
        <div className="row" style={{ paddingBottom: '20px' }}>
          <div className="col-md-12 text-center">
            <div className="btn-group btn-group-md" role="group" aria-label="...">
              <button type="button" className="btn btn-default">Recommendations</button>
              <button type="button" className="btn btn-default">Favorites</button>
            </div>
          </div>
        </div>
      </div>
    
      {props.items.map(item => <MainList item={item} key={item.title} />)}
    
    </div>
    
    )
  }
} 
// props => {
//   console.log(props, 'Main.jsx')
// }
// (
//   console.log(props, 'Main.jsx')

// );
//
// export default Main;