var React = require('react');
module.exports = React.createClass({
    render: function(){
        return(
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Description</th>
                        <th>Product Price</th>
                        <th>Product Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr><td>{this.props.result.get('productName')}</td><td>{this.props.result.get('description')}</td><td>{this.props.result.get('price')}</td><td>{this.props.result.get('type')}</td></tr>
                    </tbody>
                </table>
            </div>
        )
    }
});
