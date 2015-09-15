
'use strict';

 //Target element to render the components
var target = document.getElementById('main-container');

var Header = React.createClass({
  render: function() {
    return (
      <div className="header"></div>
    );
  }
});

var Container = React.createClass({
  getInitialState: function () {
    return {
      component : <NewContent />
    }
  },

  componentDidMount: function () {
    console.log('Mounted');
  },

  changeComponent: function (newComponent) {
    var component = this.state.component;

    this.setState({
      component: newComponent
    })
  },

  render: function() {
    return (
      <div>
        <Header/>
        <Menu component={this.changeComponent}/>
        <div className="container">
          {this.state.component}
        </div>
      </div>
    )
  }
});


//Render the components
React.render(<Container/>, target);