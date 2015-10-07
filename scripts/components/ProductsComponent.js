var React = require('react');
var Modal = require('react-modal');
var Backbone = require('backbone');
var _ = require('backbone/node_modules/underscore');
var BooksComponent = require('./BooksComponent');
var ElectronicsComponent = require('./ElectronicsComponent');
var ClothingComponent = require('./ClothingComponent');
var AddProductComponent = require('./AddProductComponent');
module.exports = React.createClass({
  getInitialState: function() {
      return {
            modalIsOpen: false
      };
  },
  componentWillMount: function(){
    this.dispatcher = {};
    _.extend(this.dispatcher, Backbone.Events);
    this.dispatcher.on('productSubmit', () => {
      this.closeModal()
    })
  },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
  closeModal: function() {
    this.setState({modalIsOpen: false});
    this.props.router.navigate('products',{trigger: true})
  },
  render: function(){

    return(
      <div className="container">
        <div className="row">
          <h4>Products</h4>
          <a className="waves-effect waves-light btn modal-trigger" onClick={this.openModal} href="#addProduct">Add Product</a>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <div className="modal-content">
              <AddProductComponent dispatcher={this.dispatcher} />
            </div>
          </Modal>
          <div className="row">
            <div className="col s12">
              <ul className="tabs">
                <li className="tab col s3"><a href="#tab-book">Books</a></li>
                <li className="tab col s3"><a href="#tab-electronic">Electronics</a></li>
                <li className="tab col s3"><a href="#tab-clothing">Clothing</a></li>
              </ul>
            </div>
            <div id="tab-book" className="col s12"><BooksComponent /></div>
            <div id="tab-electronic" className="col s12"><ElectronicsComponent /></div>
            <div id="tab-clothing" className="col s12"><ClothingComponent /></div>
          </div>
        </div>
      </div>
    )
  }
})
