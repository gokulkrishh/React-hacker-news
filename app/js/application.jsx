
'use strict';

var target = document.getElementById('main-container'); //Target element to render the components

var paginationCount = 10;

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
      isLoaded: false,
      isLoadedMore: true,
      stories: [],
      dummy: []
    }
  },
  componentDidMount: function() {

    this.getNewStories(0, 10);

    if (this.state.isSelected === 'New') {
      this.getNewStories(0, 10);
    }
    else if (this.state.isSelected === 'Show') {
      this.getNewStories(0, 10);
    }
    else if (this.state.isSelected === 'Jobs') {
      this.getNewStories(0, 10);
    }
  },
  loadMore: function() {
    
    this.setState({isLoadedMore: false}); 
    var previousCount = paginationCount + 1;
    paginationCount = paginationCount + 11;
    this.getNewStories(previousCount, paginationCount);
  },
  getNewStories: function(startIndex, paginationCount) {
    var ids = [];
    var nextItem = [];
    var storiesUrl = 'https://hacker-news.firebaseio.com/v0/item/';
    var url = '';
    var score = '';
    var i;

    $.get(this.props.source, function (response) {

      for (i = startIndex; i <= paginationCount; i++) {

        if (i === paginationCount) {
          if (this.isMounted()) {
            this.setState({isLoaded: true});    
            this.setState({isLoadedMore: true});    
          }
        }

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
          response.time = timeAgo(response.time);
          response.domain = domain;
          response.points = score;

          if (this.isMounted()) {
            this.setState({stories: this.state.stories.concat(response)});
          }
        }.bind(this));
      }

    }.bind(this));
  },
  render: function() {
    var storyList = this.state.stories.map(function (response) {
      return <div className="content" key={response.id}>
      <div className={response.isLoaded ? '': 'hide'}>
        <a href={response.url} target="_blank">{response.title}</a> <div className={response.domain ? 'domain': 'hide'}>(<span title="Domain">{response.domain}</span>)</div>
        
        <div className="bottom-content">
          <span>{response.points}</span>
          <span className="author">by {response.by} </span>
          <span>| {response.time}</span>
        </div>

        <span className="type">#{response.type}</span>
      </div>
      </div>
    });

    return(
      <div className="content-container">
        <div className={this.state.isLoaded ? 'hide': ''}>
          <Spinner />
        </div> 
        {storyList} 
        <div className={this.state.isLoadedMore ? 'hide': 'load-more'}>
          <Spinner />
        </div>

        <button className={(!this.state.isLoaded) ? 'hide': 'scroll-more'} onClick={this.loadMore}>Load more</button>
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
        <div className="container" id="container">
          <a className="goto-top" href="#main-container"></a>
          <NewSection source="https://hacker-news.firebaseio.com/v0/newstories.json"/>
        </div>
      </div>
    );
  }
});

React.render(<ContainerBox />, target);
