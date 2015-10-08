var React = require('react');
var ProductModel = require('../models/ProductModel')

module.exports = React.createClass({
  getInitialState: function(){
    return{
        bookProduct: [],
        page: 1
      }
  },
  componentWillMount: function() {
    var self = this;
    this.query = new Parse.Query(ProductModel);
    this.fetch();
    this.props.dispatcher.on('productSubmit', function(){
      self.fetch();
    });
  },
	render: function() {
    var bookElements = this.state.bookProduct.map(function(book){
      return (<tr key={book.id}><td>{book.get('productName')}</td><td>{book.get('description')}</td><td>{book.get('price')}</td></tr>)
    });
		return (
			<div className="container">
                <div className="row">
                   <form id="group1">
                        <p>
                          <input name="group1" type="radio" id="newest" onClick={this.filterNewest}/>
                          <label htmlFor="newest">Newest</label>
                          <input name="group1" type="radio" id="cheapest" onClick={this.filterCheapest}/>
                          <label htmlFor="cheapest">Cheapest</label>
                        </p>
                   </form>
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
                <ul className="pagination">
                    <li class="active"><a href="#!" value="1">1</a></li>
                    <li class="waves-effect"><a href="#!"value="2">2</a></li>
                    <li class="waves-effect"><a href="#!"value="3">3</a></li>
                    <li class="waves-effect"><a href="#!"value="4">4</a></li>
                    <li class="waves-effect"><a href="#!"value="5">5</a></li>
                </ul>
			</div>

		);
	},
  fetch: function(){
    this.query.equalTo('type', 'Books');
    this.query.find().then(
      (bookProduct) => {
        this.setState({bookProduct: bookProduct})
      },
      (err) => {
        console.log(err)
      }
    );
  },
  filterNewest: function(){
    this.query.descending("createdAt").limit(10).find().then(
      (bookProduct) => {
        this.setState({bookProduct: bookProduct})
      },
      (err) => {
        console.log(err)
      }
    );
  },
  filterCheapest: function(){
    this.query.ascending("price").limit(10).find().then(
      (bookProduct) => {
        this.setState({bookProduct: bookProduct})
      },
      (err) => {
        console.log(err)
      }
    );
  }
});
