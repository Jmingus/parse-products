var React = require('react');
var Modal = require('react-modal');
var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('backbone/node_modules/underscore');
var BooksComponent = require('./BooksComponent');
var ElectronicsComponent = require('./ElectronicsComponent');
var ClothingComponent = require('./ClothingComponent');
var AddProductComponent = require('./AddProductComponent');
var ProductModel = require('../models/ProductModel');
var SearchComponent = require('./SearchComponent')
module.exports = React.createClass({
  getInitialState: function() {
      return {
            modalIsOpen: false,
            product: [],
            showResults: false
      };
  },
  componentDidMount: function() {
    $(document).ready(function(){
        $('ul.tabs').tabs();
    })

  },
  componentWillMount: function(){
    this.dispatcher = {};
    _.extend(this.dispatcher, Backbone.Events);
    this.dispatcher.on('productSubmit', () => {
      this.closeModal()
    });
    this.query = new Parse.Query(ProductModel)
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
    this.props.router.navigate('products',{trigger: true})
  },
  render: function(){
    var searchResult = this.state.product.map(function(result){
      return (<SearchComponent result={result}/>)
    });
    return(
      <div className="container">
        <div className="row">
          <h4>Products</h4>
          <div className="row">
            <div className="col s3">
              <a className="waves-effect waves-light btn modal-trigger" onClick={this.openModal} href="#addProduct">Add Product</a>
            </div>
            <div className="col s9">
              <form onSubmit={this.searchFilter}>
                <input type="text" ref="search" id="search" placeholder="Search" />
              </form>
                {this.state.showResults ? {searchResult} : null }
          </div>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <div className="modal-content">
              <AddProductComponent dispatcher={this.dispatcher} />
            </div>
          </Modal>
          <div className="row">
            <div className="col s12">
              <ul className="tabs" id="tabs">
                <li className="tab col s3"><a href="#tab-book">Books</a></li>
                <li className="tab col s3"><a href="#tab-electronic">Electronics</a></li>
                <li className="tab col s3"><a href="#tab-clothing">Clothing</a></li>
              </ul>
            </div>
            <div id="tab-book" className="col s12"><BooksComponent dispatcher={this.dispatcher} /></div>
            <div id="tab-electronic" className="col s12"><ElectronicsComponent dispatcher={this.dispatcher}/></div>
            <div id="tab-clothing" className="col s12"><ClothingComponent dispatcher={this.dispatcher}/></div>
          </div>
        </div>
      </div>
    </div>
    )
  },
  searchFilter: function(e){
    e.preventDefault();
    var searchInput = this.refs.search.getDOMNode().value;
    this.query.equalTo('productName', searchInput);
    this.query.find().then(
    (product) => {
    this.setState({product: product})
    },
    (err) => {
        console.log(err)
    });
    this.setState({ showResults: true})
    }
});
