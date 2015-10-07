var React = require('react');
var ProductModel = require('../models/ProductModel');

module.exports = React.createClass({
	getInitialState: function() {
		return { error: null };
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
		return (
			<div className="container">
				<div className="row">
					<form className="col s12" onSubmit={this.onAddProduct}>
						<h1>Add Product</h1>
						{errorElement}
						<div className="row">
							<div className="input-field col s12">
								<label htmlFor="productName">Product Name</label>
								<input id="productName" type="text" ref="productName" className="validate" />

							</div>
						</div>
						<div className="row">
							<div className="input-field col s12">
								<label htmlFor="textarea1">Description</label>
								<textarea id="textarea1" className="materialize-textarea" ref="description"></textarea>

							</div>
						</div>
						<div className="row">
							<div className="input-field col s6">
								<label htmlFor="price">Price</label>
								<input  id="price" type="number" className="validate" ref="price" />
							</div>
							<div className="input-field col s6">
								<select className="browser-default" ref="type">
									<option defaultValue="" disabled selected>Category</option>
									<option defaultValue="books">Books</option>
									<option defaultValue="electronics">Electronics</option>
									<option defaultValue="clothing">Clothing</option>
								</select>
							</div>
						</div>
						<div className="row">
							<button className="waves-effect waves-light btn">Add Product</button>
						</div>
					</form>
				</div>
			</div>
		);
	},
	onAddProduct: function(e) {
		e.preventDefault();
		var productPrice = parseInt(this.refs.price.getDOMNode().value)
		var newProduct = new ProductModel({
			productName: this.refs.productName.getDOMNode().value,
			description: this.refs.description.getDOMNode().value,
			price: productPrice,
			type: this.refs.type.getDOMNode().value
		});
		newProduct.save().then(this.props.dispatcher.trigger('productSubmit'));

	}
});
