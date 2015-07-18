
'use strict';

var target = document.getElementById('main-container'); //Target element to render the components

var Header = React.createClass({
  render: function() {
    return(
      <div className="header">
      </div>
    );
  }
});

var MenuBar = React.createClass({
  render: function() {
    return(
      <ul className="menu">
        <li className="selected">New</li>
        <li>Show</li>
        <li>Jobs</li>
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
    var ids = [];
    var nextItem = [];
    var storiesUrl = 'https://hacker-news.firebaseio.com/v0/item/';
    var url = '';
    var score = '';

    $.get(this.props.source, function (response) {

      for (var i = 0; i <= 1; i++) {

        url = storiesUrl + response[i] + '.json';
        
        $.get(url, function (response) {

          console.log(response)

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

          if (this.isMounted()) {
            this.setState({
              id: response.id,
              title: response.title,
              url: response.url,
              time: timeAgo(response.time),
              author: response.by,
              type: response.type,
              domain: domain,
              points: score,
              isLoaded: true
            });
          }  
        }.bind(this));
      }

    }.bind(this));
  },
  render: function() {
    return(
      <div className="content">
        
        <img title="loader" src="../images/spinner.gif" className={this.state.isLoaded ? 'hide': ''}/>
    
        <div className={this.state.isLoaded ? '': 'hide'}>
          
          <a href={this.state.url} target="_blank">{this.state.title}</a> <span title="Domain">({this.state.domain})</span>  
          
          <div className="bottom-content">
            <span>{this.state.points}</span>
            <span className="author">by {this.state.author} </span>
            <span>| {this.state.time}</span>
          </div>

        </div>
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

