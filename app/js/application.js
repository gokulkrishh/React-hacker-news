
'use strict';

var target = document.getElementById('main-container'); //Target element to render the components

var items = [];

var Header = React.createClass({
  render: function() {
    return(
      <div className="header">
      </div>
    );
  }
});

var MenuBar = React.createClass({
  getInitialState: function() {
    return {
      isSelected: 'New'
    }
  },
  handleClick: function(event) {
    if (event.target.innerHTML === 'New') {
      this.setState({
        isSelected : 'New'
      });
    }
    else if (event.target.innerHTML === 'Show') {
      this.setState({
        isSelected : 'Show'
      }); 
    }
    else if (event.target.innerHTML === 'Jobs') {
      this.setState({
        isSelected : 'Jobs'
      });
    }
  },
  render: function() {
    return(
      <ul className="menu" onClick={this.handleClick}>
        <li className={this.state.isSelected === 'New' ? 'selected' : '' }>New</li>
        <li className={this.state.isSelected === 'Show' ? 'selected' : '' }>Show</li>
        <li className={this.state.isSelected === 'Jobs' ? 'selected' : '' }>Jobs</li>
      </ul>
    );
  }

});

var NewSection = React.createClass({
  getInitialState: function() {
    return {
      id: '',
      title: '',
      url: '',
      time: '',
      author: '',
      domain: '',
      type: '',
      points: '',
      isLoaded: false
    }
  },
  componentDidMount: function() {
    console.log(this);

    this.getNewStories();
    if (this.state.isSelected === 'New') {
      this.getNewStories();
    }
    else if (this.state.isSelected === 'Show') {
      this.getNewStories();
    }
    else if (this.state.isSelected === 'Jobs') {
      this.getNewStories();
    }
  },
  getNewStories: function () {
    var ids = [];
    var nextItem = [];
    var storiesUrl = 'https://hacker-news.firebaseio.com/v0/item/';
    var url = '';
    var score = '';
    var paginationCount = 10;

    $.get(this.props.source, function (response) {

      for (var i = 0; i <= paginationCount; i++) {

        url = storiesUrl + response[i] + '.json';
        
        $.get(url, function (response) {

          var domain = response.url ? response.url.split(':')[1].split('//')[1].split('/')[0] : ''; //To get domain name

          function timeAgo(ts) {
            var d = new Date(); // Gets the current time
            var nowTs = Math.floor(d.getTime() / 1000);
            var seconds = nowTs - ts;

            // more that two days
            if (seconds > 2*24*3600) {
               return 'a few days ago';
            }
            
            // a day
            if (seconds > 24*3600) {
             return 'yesterday';
            }

            if (seconds > 3600) {
             return 'a few hours ago';
            }
            if (seconds > 1800) {
             return 'Half an hour ago';
            }
            if (seconds > 60) {
              return Math.floor(seconds/60) + ' minutes ago';
            }
          }

         
          //To add plural and singular work in points
          if (response.score > 1) {
            score = response.score + ' Points '
          }
          else {
            score = response.score + ' Point '
          }

          response.isLoaded = true;
          response.domain = domain;

          items.push({
            response: response
          })

          if (this.isMounted()) {
            this.setState({
              id: response.id,
              title: response.title,
              url: response.url,
              time: timeAgo(response.time),
              author: response.by,
              type: response.type,
              domain: domain,
              points: score
            });
          }  
        }.bind(this));
      }

    }.bind(this));
  },
  render: function() {
    return(
      <div>
      {
        items.map(function (data) {
        return <div className="content" key={data.response.id}> 
          <img title="loader" src="../images/spinner.gif" className={data.response.isLoaded ? 'hide': ''}/>
          <div className={data.response.isLoaded ? '': 'hide'}>
            
            <a href={data.response.url} target="_blank">{data.response.title}</a> <span className={data.response.domain ? '': 'hide'}>(</span><span title="Domain">{data.response.domain}</span><span>)</span>
            
            <div className="bottom-content">
              <span>{data.response.points}</span>
              <span className="author">by {data.response.author} </span>
              <span>| {data.response.time}</span>
            </div>

            <span className="type">#{data.response.type}</span>
          </div>
        </div>
        })
      }
      </div>
    );
  }
});

var ContainerBox = React.createClass({
  render: function() {
    return(
      <div>
        <Header />
        <MenuBar />
        <div className="container">
          <NewSection source="https://hacker-news.firebaseio.com/v0/newstories.json"/>
        </div>
      </div>
    );
  }
});

React.render(<ContainerBox />, target);
