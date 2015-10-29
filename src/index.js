import 'todomvc-common';
import {TodoModel} from './stores/todoModel';
import ViewModel from './stores/viewModel';
import TodoApp from './components/todoApp.js';
import React from 'react';
import ReactDOM from 'react-dom';

// Enable the dev tools:
import 'mobservable-react-devtools';

var todoModel = new TodoModel('mobservable-react-todomvc');
var viewModel = new ViewModel();

ReactDOM.render(
	<TodoApp todoModel={todoModel} viewModel={viewModel}/>,
	document.getElementById('todoapp')
);
