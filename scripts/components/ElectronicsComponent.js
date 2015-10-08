var React = require('react');
var ProductModel = require('../models/ProductModel')

module.exports = React.createClass({
    getInitialState: function(){
        return{
            electronicProduct: [],
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
        var electronicElements = this.state.electronicProduct.map(function(electronic){
            return (<tr key={electronic.id}><td>{electronic.get('productName')}</td><td>{electronic.get('description')}</td><td>{electronic.get('price')}</td></tr>)
        });
        return (
            <div className="container">
                <div className="row">
                    <form id="group2">
                        <p>
                            <input name="group2" type="radio" id="newest" onClick={this.filterNewest}/>
                            <label htmlFor="newest">Newest</label>
                            <input name="group2" type="radio" id="cheapest" onClick={this.filterCheapest}/>
                            <label htmlFor="cheapest">Cheapest</label>
                        </p>
                    </form>
                    <table className="bordered striped responsive-table">
                        <thead>
                        <tr>
                            <th data-field="name">Electronic Name</th>
                            <th data-field="description">Electronic Description</th>
                            <th data-field="price">Electronic Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {electronicElements}
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
        this.query.equalTo('type', 'Electronics');
        this.query.find().then(
            (electronicProduct) => {
                this.setState({electronicProduct: electronicProduct})
            },
            (err) => {
                console.log(err)
            }
        );
    },
    filterNewest: function(){
        this.query.descending("createdAt").limit(10).find().then(
            (electronicProduct) => {
                this.setState({electronicProduct: electronicProduct})
            },
            (err) => {
                console.log(err)
            }
        );
    },
    filterCheapest: function(){
        this.query.ascending("price").limit(10).find().then(
            (electronicProduct) => {
                this.setState({electronicProduct: electronicProduct})
            },
            (err) => {
                console.log(err)
            }
        );
    }
});
