
'use strict';

import React from 'react';
import NewContent from './components/newContent.jsx';
import Menu from './components/menu.jsx';

//Target element to render the components
let target = document.getElementById('main-container');

let Header = React.createClass({
  render() {
    return (
      <div className="header"></div>
    );
  }
});

let Container = React.createClass({
  getInitialState() {
    return {
      renderComponent : <NewContent source="https://hacker-news.firebaseio.com/v0/newstories.json"/>,
      component: null
    }
  },
  
  changeComponent(component) {
    let renderComponent = this.state.renderComponent;

    this.setState({
      renderComponent: component
    })
  },

  render() {
    return (
      <div>
        <Header/>
        <Menu component={this.changeComponent} />
        <div className="container">
          <a className="goto-top" href="#main-container"></a>
          {this.state.renderComponent}
        </div>
      </div>
    )
  }
});


//Render the components
React.render(<Container />, target);