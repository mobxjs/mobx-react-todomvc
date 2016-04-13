import 'todomvc-common';
import {TodoModel} from './stores/todoModel';
import ViewModel, {ALL_TODOS} from './stores/viewModel';
import TodoApp from './components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';
import {StateNavigator} from 'navigation';

var todoModel = new TodoModel('mobx-react-todomvc');
var viewModel = new ViewModel();
var stateNavigator = new StateNavigator([
	{key: 'todo', route: '{filter?}', defaults: {filter: ALL_TODOS}}
]);

ReactDOM.render(
	<TodoApp
		todoModel={todoModel}
		viewModel={viewModel}
		stateNavigator={stateNavigator}
	/>,
	document.getElementById('todoapp')
);
