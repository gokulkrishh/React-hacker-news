var pagination = 10;

var NewContent = React.createClass({

  getInitialState: function () {
    return {
      newStories: [],
      dummy: [1,2,3,4,5,6,7,8,9,10],
      isLoading: true,
      isLoadingMore: false
    }
  },

  showLoader: function () {
    this.setState({
      isLoading: true
    });
  },

  hideLoader: function () {
    this.setState({
      isLoading: false
    });
  },

  componentDidMount: function () {
    this.getContentJson(0, pagination, false);
  },

  getContentJson: function (startIndex, pagination, isLoadingMore) {

    var sourceUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json';
    
    $.get(sourceUrl, function (response) {
      
      if (response.length == 0) {
        this.hideLoader();
        return;
      }

      for(var i = startIndex; i <= pagination; i++) {
        if (i == pagination) {
          
          if(this.isMounted()) this.hideLoader();

          if (this.isMounted() && isLoadingMore) this.setState({ isLoadingMore: false });

          this.loadMore(pagination);
          return false;
        }

        this.getContentData(response[i], pagination);
      }      

    }.bind(this));
  },

  getContentData: function (id) {

    var contentUrl = 'https://hacker-news.firebaseio.com/v0/item/' + id + '.json';

    $.get(contentUrl, function (response) {
      
      if (response.length == 0) {
        if (this.isMounted()) {
          this.hideLoader();
        }
        return;
      }

      var domain = response.url ? response.url.split(':')[1].split('//')[1].split('/')[0] : '';

      response.domain = domain;

      this.setState({newStories : this.state.newStories.concat(response)});

    }.bind(this));
  },

  convertTime: function (time) {
    var d = new Date();
    var currentTime = Math.floor(d.getTime() / 1000);
    var seconds = currentTime - time;

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
  },

  loadMore: function (pagination) {

    $(window).unbind('scroll');

    $(window).bind('scroll', function () {

      if ($(window).scrollTop() >= $(document).height() - $(window).height()) {
          var previousCount = pagination + 1;
          pagination = pagination + 11;

          this.setState({isLoadingMore : true}); //To show loader at the bottom

          this.getContentJson(previousCount, pagination, true);
      }
    }.bind(this));
  },

  render: function () {
    var newStories = this.state.newStories.map(function (response, index) {
      return (
        <div key={index}>
          <div className="content">
            <a target="_blank" href={response.url}>{response.title} </a>
            
            <div className={response.domain ? 'domain': 'hide'}> (<span title="Domain">{response.domain}</span>)</div>
          
            <div className="bottom-content">
              <span>{response.score} {(response.score > 1) ? ' Points' : ' Point'} </span>
              <span className="author"> by {response.by}</span>
              <span> | {this.convertTime(response.time)} </span>
            </div>

            <span className="type">#{response.type}</span>
          </div>
        </div>
      )
    }.bind(this));

    return (
      <div className="content-container">
        <div className={this.state.isLoading ? '': 'hide'}>
          <Spinner />
        </div>
        
        {newStories}
        
        <div className={ this.state.isLoadingMore ? 'mtop50' : 'hide'}>
          <Spinner />
        </div>
      </div>
    )
  }
});
