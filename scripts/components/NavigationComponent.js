var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	componentWillMount: function() {
		this.props.router.on('route', () => {
			this.forceUpdate();
		});
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
				<a href="#" className="brand-logo left">Parse-Products</a>
				<ul id="nav-mobile" className="right">
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
