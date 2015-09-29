
'use strict';

import React from 'react'
import NewContent from './feeds/newContent.jsx'
import ShowContent from './feeds/showContent.jsx'
import JobsContent from './feeds/jobsContent.jsx'
import { Link } from 'react-router'

let Menu = React.createClass({
  getInitialState() {
    return {
      items: [{
        name: 'new',
        id: 1
      },
      {
        name: 'show',
        id: 2
      },
      {
        name: 'jobs',
        id: 3
      },
      {
        name: 'about',
        id: 4
      }]
    }
  },
  
  changeMenu(index) {
    let items = this.state.items;

    items.map(function (item) {
      item.selected = false;
    });

    items[index].selected = true;
    
    this.setState({
      items : items
    });
  },

  menuChange() {
    console.log('cem')
  },

  render() {
    return (
      <div className="menu">
        <ul>
          { 
            this.state.items.map(function(item, index) {
              return (
                <li key={ item.id }>
                  <Link to={ '/' + item.name } activeClassName="selected">{ item.name }</Link>
                </li>
              )
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});

module.exports = Menu;