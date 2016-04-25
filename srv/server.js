var fs = require('fs');
var express = require('express');
var path = require('path');


import { renderToString } from 'react-dom/server'


import {TodoModel} from '../src/stores/todoModel';
import ViewModel from '../src/stores/viewModel';
import TodoApp from '../src/components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';





var app = express();
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')))

// initialize webpack HMR
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../webpack.config')
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))



app.get('/', function(req, res) {
  var todoModel = new TodoModel('mobx-react-todomvc');
  var viewModel = new ViewModel();

  const initView = renderToString((
    <TodoApp todoModel={todoModel} viewModel={viewModel}/>
  ))

  let page = renderFullPage(initView)


  res.status(200).send(page)
});


function renderFullPage(html) {
  return `
  <!doctype html>
  <html lang="utf-8">
    <head>
    <link rel="stylesheet" href="/node_modules/todomvc-common/base.css">
    <link rel="stylesheet" href="/node_modules/todomvc-app-css/index.css">
    </head>
    <body>
    <section id="todoapp" class="todoapp">${html}</section>
    <script src="/static/bundle.js"></script>
    </body>
  </html>
  `
}

// example of handling 404 pages
app.get('*', function(req, res) {
  res.status(404).send('Server.js > 404 - Page Not Found');
})

// global error catcher, need four arguments
app.use((err, req, res, next) => {
  console.error("Error on request %s %s", req.method, req.url);
  console.error(err.stack);
  res.status(500).send("Server error");
});

process.on('uncaughtException', evt => {
  console.log( 'uncaughtException: ', evt );
})

app.listen(3000, function(){
  console.log('Listening on port 3000');
});
