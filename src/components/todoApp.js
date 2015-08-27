import React from 'react/addons';
import {reactiveComponent} from 'mobservable-react';
import {Router} from 'director';
import utils from '../utils';
import {ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS} from '../stores/viewModel';

import TodoItem from './todoItem';
import TodoFooter from './todoFooter';

const ENTER_KEY = 13;

@reactiveComponent
export default class TodoApp extends React.Component {

	render() {
		let main;
		const {viewModel, todoModel} = this.props;
		const todos = todoModel.todos;

		const shownTodos = todos.filter(todo => {
			switch (viewModel.todoFilter) {
				case ACTIVE_TODOS:
					return !todo.completed;
				case COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		});

		const todoItems = shownTodos.map(todo => {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					viewModel={viewModel}
				/>
			);
		});

		if (todos.length) {
			main = (
				<section className="main">
					<input
						className="toggle-all"
						type="checkbox"
						onChange={this.toggleAll}
						checked={todoModel.activeTodoCount === 0}
					/>
					<ul className="todo-list">
						{todoItems}
					</ul>
				</section>
			);
		}

		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						ref="newField"
						className="new-todo"
						placeholder="What needs to be done?"
						onKeyDown={this.handleNewTodoKeyDown}
						autoFocus={true}
					/>
				</header>
				{main}
				<TodoFooter todoModel={todoModel} viewModel={viewModel} />
			</div>
		);
	}

	componentDidMount() {
		var viewModel = this.props.viewModel;
		var router = Router({
			'/': function() { viewModel.todoFilter = ALL_TODOS; },
			'/active': function() { viewModel.todoFilter = ACTIVE_TODOS; },
			'/completed': function() { viewModel.todoFilter = COMPLETED_TODOS; }
		});
		router.init('/');
	}

	handleNewTodoKeyDown = (event) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = React.findDOMNode(this.refs.newField).value.trim();

		if (val) {
			this.props.todoModel.addTodo(val);
			React.findDOMNode(this.refs.newField).value = '';
		}
	}

	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.todoModel.toggleAll(checked);
	}
}
