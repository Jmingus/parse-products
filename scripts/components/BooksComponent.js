var React = require('react');
var ProductModel = require('../models/ProductModel')

module.exports = React.createClass({
  getInitialState: function(){
    return{
        product: []
      }
  },
  componentWillMount: function() {
    var self = this;
    this.query = new Parse.Query(ProductModel)
    this.fetch();
    this.props.dispatcher.on('productSubmit', function(){
      self.fetch();
    });
  },
	render: function() {
    var bookElements = this.state.product.map(function(book){
      return (<tr key={book.id}><td>{book.get('productName')}</td><td>{book.get('description')}</td><td>{book.get('price')}</td></tr>)
    })
		return (
			<div className="container">
				<div className="row">
          <table className="bordered striped responsive-table">
            <thead>
              <tr>
                <th data-field="name">Book Name</th>
                <th data-field="description">Book Description</th>
                <th data-field="price">Book Price</th>
              </tr>
            </thead>
            <tbody>
              {bookElements}
            </tbody>
          </table>
				</div>
			</div>
		);
	},
  fetch: function(){
    this.query.equalTo('type', 'Books')
    this.query.find().then(
      (product) => {
        this.setState({product: product})
      },
      (err) => {
        console.log(err)
      }
    );
  }
});
