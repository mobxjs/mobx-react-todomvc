var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

import { renderToString } from 'react-dom/server'

import TodoStore from '../src/stores/TodoStore';
import ViewStore from '../src/stores/ViewStore';
import TodoApp from '../src/components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';


var app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))

// initialize webpack HMR
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('../webpack.config');
var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));


let todos = [];

app.use(bodyParser.json());

app.get('/', function(req, res) {
	var todoStore = TodoStore.fromJS(todos);
	var viewStore = new ViewStore();

	const initView = renderToString((
		<TodoApp todoStore={todoStore} viewStore={viewStore} userAgent={req.headers['user-agent']} />
	));

	let page = renderFullPage(initView);

	res.status(200).send(page);
});

app.post('/api/todos', function(req, res) {
	if (Array.isArray(req.body.todos)) {
		todos = req.body.todos;
		res.status(201).send(JSON.stringify({ success: true }));
	} else {
		res.status(200).send(JSON.stringify({ success: false, error: "expected `todos` to be array" }));
	}
});

function renderFullPage(html) {
	let initialState = { todos };
	return `
	<!doctype html>
	<html lang="utf-8">
		<head>
			<link rel="stylesheet" href="/node_modules/todomvc-common/base.css">
			<link rel="stylesheet" href="/node_modules/todomvc-app-css/index.css">
			<script>
				window.initialState = ${JSON.stringify(initialState)}
			</script>
		</head>
		<body>
			<section id="todoapp" class="todoapp">${html}</section>
			<script src="/static/bundle.js"></script>
			<footer class="info">
				<p>Double-click to edit a todo</p>
				<p>TodoMVC powered by React and <a href="http://github.com/mobxjs/mobx/">MobX</a>. Created by <a href="http://github.com/mweststrate/">mweststrate</a></p>
				<p>Based on the base React TodoMVC by <a href="http://github.com/petehunt/">petehunt</a></p>
				<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
			</footer>
		</body>
	</html>
	`
}

// example of handling 404 pages
app.get('*', function(req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

// global error catcher, need four arguments
app.use((err, req, res, next) => {
	console.error("Error on request %s %s", req.method, req.url);
	console.error(err.stack);
	res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
	console.log( 'uncaughtException: ', evt );
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});
