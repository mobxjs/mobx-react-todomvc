import 'todomvc-common';
import {TodoModel} from './stores/todoModel';
import ViewModel from './stores/viewModel';
import TodoApp from './components/todoApp.js';
import React from 'react';

// Enable the dev tools:
// import 'mobservable-devtools';

var todoModel = new TodoModel('react-mobservable-todos');
var viewModel = new ViewModel();

React.render(
	<TodoApp todoModel={todoModel} viewModel={viewModel}/>,
	document.getElementById('todoapp')
);
