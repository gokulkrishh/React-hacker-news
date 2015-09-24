
'use strict';

import React from 'react';

const Spinner = React.createClass({
  render() {
    return (
      <svg className="spinner" width="50px" height="50px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
   			<circle className="path" fill="none" strokeWidth="5" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
			</svg>
    );
  }
});

module.exports = Spinner;