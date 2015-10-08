var React = require('react');
var Backbone = require('backbone');
var $ = require('jquery');

module.exports = React.createClass({
	componentWillMount: function() {
		this.props.router.on('route', () => {
			this.forceUpdate();
		});
	},
    componentDidMount: function() {
        $(document).ready(function(){
            $('.button-collapse').sideNav();
        })

    },
	render: function() {
		var currentPage = Backbone.history.getFragment();

		var links = [
			<li key="home" className={currentPage === '' ? 'active' : ''}><a href="#">Home</a></li>,
			<li key="products" className={currentPage === 'products' ? 'active' : ''}><a href="#products">Products</a></li>
		];

		if(Parse.User.current()) {
			links.push(<li key="logout"><a href="#logout" onClick={this.onLogout}>Logout</a></li>)
		}
		else {
			links.push(<li key="login" className={currentPage === 'login' 		? 'active' : ''}><a href="#login">Login</a></li>);
			links.push(<li key="register" className={currentPage === 'register' 	? 'active' : ''}><a href="#register">Register</a></li>);
		}


		return (
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">Parse Products</a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        {links}
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        {links}
                    </ul>
                </div>
		);
	},
	onLogout: function(e) {
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('', {trigger: true});
	}
})
