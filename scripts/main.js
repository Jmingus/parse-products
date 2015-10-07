'use strict';
var React = require('react');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;
Parse.initialize('Cy8lfRptk9mMv94H0yyPSs6KUGEWlgCK8xlRC9c4','gtcjDWxajhrR4EI6ieeqWggjtkKWnHc97KSceycq')
var NavigationComponent = require('./components/NavigationComponent');
var HomeComponent = require('./components/HomeComponent');
var LoginComponent = require('./components/LoginComponent');
var RegisterComponent = require('./components/RegisterComponent');
var ProductsComponent = require('./components/ProductsComponent');
var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'products': 'products',
		'login': 'login',
		'register': 'register'
	},
	home: function() {
		React.render(<HomeComponent />, app);
	},
	products: function() {
		React.render(<ProductsComponent router={r} />, app);
	},
	login: function() {
		React.render(<LoginComponent router={r} />, app);
	},
	register: function() {
		React.render(<RegisterComponent router={r} />, app);
	}
});

var r = new Router();
Backbone.history.start();

React.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);
