import 'todomvc-common';
import TodoStore from './stores/TodoStore';
import ViewStore from './stores/ViewStore';
import TodoApp from './components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';

const initialState = window.initialState || {};

var todoStore = TodoStore.fromJS(initialState.todos || []);
var viewStore = new ViewStore();

todoStore.subscribeServerToStore();

ReactDOM.render(
	<TodoApp todoStore={todoStore} viewStore={viewStore}/>,
	document.getElementById('todoapp')
);
