
'use strict';

let Menu = React.createClass({
  getInitialState: function () {
    return {
      items: [{
        name: 'New',
        id: 1,
        selected: true
      },
      {
        name: 'Show',
        id: 2,
        selected: false
      },
      {
        name: 'Jobs',
        id: 3,
        selected: false
      }]
    }
  },
  
  changeMenu: function (index, menuName) {
    let items = this.state.items;

    items.map(function (item) {
      item.selected = false;
    });

    //Based on the menu, change the components
    if (menuName === 'New') {
      this.props.component(<NewContent source="https://hacker-news.firebaseio.com/v0/newstories.json"/>);
    }
    else if (menuName === 'Show') {
      this.props.component(<ShowContent source="https://hacker-news.firebaseio.com/v0/newstories.json"/>);
    }
    else if (menuName === 'Jobs') {
      this.props.component(<JobsContent source="https://hacker-news.firebaseio.com/v0/newstories.json"/>);
    }

    items[index].selected = true;
    
    this.setState({
      items : items
    })
  },

  render: function() {
    return (
      <div className="menu">
        <ul>
          { 
            this.state.items.map(function(item, index) {
              return <li className={item.selected ? 'selected': ''} onClick={this.changeMenu.bind(this, index, item.name)} key={item.id}>{item.name}</li>
            }.bind(this))
          }
        </ul>
      </div>
    );
  }
});

