var React = require('react');
var ProductModel = require('../models/ProductModel')

module.exports = React.createClass({
    getInitialState: function(){
        return{
            clothingProduct: [],
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
        var clothingElements = this.state.clothingProduct.map(function(clothing){
            return (<tr key={clothing.id}><td>{clothing.get('productName')}</td><td>{clothing.get('description')}</td><td>{clothing.get('price')}</td></tr>)
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
                            <th data-field="name">Clothing Name</th>
                            <th data-field="description">Clothing Description</th>
                            <th data-field="price">Clothing Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clothingElements}
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
        this.query.equalTo('type', 'Clothing');
        this.query.find().then(
            (clothingProduct) => {
                this.setState({clothingProduct: clothingProduct})
            },
            (err) => {
                console.log(err)
            }
        );
    },
    filterNewest: function(){
        this.query.descending("createdAt").limit(10).find().then(
            (clothingProduct) => {
                this.setState({clothingProduct: clothingProduct})
            },
            (err) => {
                console.log(err)
            }
        );
    },
    filterCheapest: function(){
        this.query.ascending("price").limit(10).find().then(
            (clothingProduct) => {
                this.setState({clothingProduct: clothingProduct})
            },
            (err) => {
                console.log(err)
            }
        );
    }
});
