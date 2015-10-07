var React = require('react');

module.exports = React.createClass({
  getInitialState: function(){
    return{
        books: []
      }
  },
  componentWillMount: function() {

  },
	render: function() {
		return (
			<div className="container">
				<div className="row">
					<h1>Books</h1>
				</div>
			</div>
		);
	}
});
