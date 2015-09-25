
'use strict';

import React from 'react';
import Spinner from '../spinner.jsx';

let Profile = React.createClass({
	getInitialState() {
		return {
			user: "",
			about: "",
			created: "",
			karma: "",
			isLoading: true
		}
	},

	hideLoading() {
		this.setState({ isLoading: false });
	},

	showLoading() {
		this.setState({ isLoading: true });
	},

	componentDidMount() {
		let id = this.props.params.id;

		let source = 'https://hacker-news.firebaseio.com/v0/user/' + id + '.json';

		$.get(source, function (response) {

			this.hideLoading();
			
			if (response) {
				this.setState({ 
					user: response.id,
					about: response.about,
					created: response.created,
					karma: response.karma
				});
			}

		}.bind(this));
	},

	render() {
		return (
			<div className="content profile-content">
				<div className={this.state.isLoading ? 'spinner-container': 'hide'}>
          <Spinner />
        </div>
				
				<div className={this.state.isLoading ? 'hide': 'content-added'}>
					<h1>User : <span>	{ this.state.user } </span></h1>
					<h1 className={this.state.about ? '': 'hide'}> About : <span>	{ this.state.about }</span></h1>
					<h1>Created : <span> { this.state.created } </span></h1>
					<h1>Karma : <span> { this.state.karma ? this.state.karma : 0 } </span></h1>
					{/* <h1>Submitted : </h1> */}
				</div>
			</div>
		)
	}
});


module.exports = Profile;