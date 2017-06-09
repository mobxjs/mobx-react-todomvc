import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import escape from 'jsesc';

// import { renderToString } from 'react-dom/server'
//
// import TodoStore from '../src/stores/TodoStore';
// import ViewStore from '../src/stores/ViewStore';
// import TodoApp from '../src/components/todoApp.js';
// import React from 'react';

const app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

const renderFullPage = html => {
	const initialState = { todos };
	const initialStateJSON = escape( // So safe!
		JSON.stringify(initialState),
		{ wrap: true, isScriptContext: true, json: true }
	);
	return `
	<!doctype html>
	<html lang="utf-8">
		<head>
			<link rel="stylesheet" href="/node_modules/todomvc-common/base.css">
			<link rel="stylesheet" href="/node_modules/todomvc-app-css/index.css">
			<script>
				window.initialState = ${initialStateJSON}
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
};

let todos = []; // Todos are stored here

app.use(bodyParser.json());

app.get('/', function(req, res) {
	// const todoStore = TodoStore.fromJS(todos);
	// const viewStore = new ViewStore();
  //
	// const initView = renderToString((
	// 	<TodoApp todoStore={todoStore} viewStore={viewStore} />
	// ));
  //
	const page = renderFullPage('');

	res.status(200).send(page);
});

app.post('/api/todos', function(req, res) {
	todos = req.body.todos;
	if (Array.isArray(todos)) {
		console.log(`Updated todos (${todos.length})`);
		res.status(201).send(JSON.stringify({ success: true }));
	} else {
		res.status(200).send(JSON.stringify({ success: false, error: "expected `todos` to be array" }));
	}
});

app.get('*', function(req, res) {
	res.status(404).send('Server.js > 404 - Page Not Found');
});

app.use((err, req, res, next) => {
	console.error("Error on request %s %s", req.method, req.url);
	console.error(err.stack);
	res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
	console.log('uncaughtException: ', evt);
});

app.listen(3000, function(){
	console.log('Listening on port 3000');
});
