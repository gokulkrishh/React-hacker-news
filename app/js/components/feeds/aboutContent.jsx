
'use strict';

const AboutContent = React.createClass({
  render() {
    return (
    	<div className="content-container">
      	<div className="content about-page">
      		<h1 className="heading">About</h1>
      		<p className="about-content">The HackerNews site is create using <a href="https://github.com/HackerNews/API">API</a> provided by <a href="https://github.com/HackerNews">HackerNews</a>.
      		</p>

      		<h1 className="heading">Contributor</h1>
      		<p className="about-content"><a href="https://github.com/gokulkrishh">Gokul</a></p>

      		<h1 className="heading">Source</h1>
      		<p className="about-content"><a href="https://github.com/gokulkrishh/React-hacker-news">Github</a></p>

			    <h1 className="heading">
			    	<iframe src="https://ghbtns.com/github-btn.html?user=gokulkrishh&repo=React-hacker-news&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
			    	<iframe src="https://ghbtns.com/github-btn.html?user=gokulkrishh&repo=React-hacker-news&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="158px" height="30px"></iframe>

			    </h1>
	     	</div>
      </div>
    );
  }
});

module.exports = AboutContent;