var paginationCount = 10;

var NewContent = React.createClass({
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

    var source= "https://hacker-news.firebaseio.com/v0/newstories.json";

    $.get(source, function (response) {

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
      return (
      	<div className="content" key={response.id}>
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
      )
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
