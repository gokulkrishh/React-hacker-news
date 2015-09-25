
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
        id: 1,
        selected: true
      },
      {
        name: 'show',
        id: 2,
        selected: false
      },
      {
        name: 'jobs',
        id: 3,
        selected: false
      },
      {
        name: 'about',
        id: 4,
        selected: false
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
                <li className={ item.selected ? 'selected': '' } key={ item.id }>
                  <Link to={ '/' + item.name } onClick={ this.changeMenu.bind(this, index) }>{ item.name }</Link>
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