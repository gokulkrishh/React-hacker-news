
'use strict';

import React from 'react'
import Menu from './components/menu.jsx'
import NewContent from './components/feeds/newContent.jsx'
import ShowContent from './components/feeds/showContent.jsx'
import JobsContent from './components/feeds/jobsContent.jsx'
import Profile from './components/user/profile.jsx'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'

//Target element to render the components
let target = document.getElementById('main-container');

let Header = React.createClass({
  render() {
    return (
      <div className="header"></div>
    );
  }
});

let App = React.createClass({
  goToTop() {
    $(document).scrollTop(0);
  },

  render() {
    return (
      <div>
        <Header/>
        <Menu/>
        <div className="container">
          <a className="goto-top" onClick={this.goToTop}></a>
          {this.props.children}
        </div>
      </div>
    )
  }
});

// Make a new component to render inside of Inbox
const Message = React.createClass({
  render() {
    return <h3>Message</h3>
  }
})


//Render the components
React.render(
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={NewContent} />
      <Route path="new" component={NewContent} />
      <Route path="show" component={ShowContent} />
      <Route path="jobs" component={JobsContent} />
      <Route path="user/:id" component={Profile} />
    </Route>
  </Router>

  , target);