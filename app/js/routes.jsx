
'use strict';

import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'

Router.run(routes, (Handler, state) => { 
	console.log('Handler --->', Handler);
	console.log('state --->', state);
});