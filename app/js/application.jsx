
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
      renderComponent : <NewContent />
    }
  },
  
  changeComponent: function (newComponent) {
    var renderComponent = this.state.renderComponent;

    this.setState({
      renderComponent: newComponent
    })
  },

  render: function() {
    return (
      <div>
        <Header/>
        <Menu component={this.changeComponent}/>
        <div className="container">
          <a className="goto-top" href="#main-container"></a>
          {this.state.renderComponent}
        </div>
      </div>
    )
  }
});


//Render the components
React.render(<Container/>, target);