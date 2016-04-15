import React from 'react';
import {observer} from 'mobx-react';
import { todoStore, viewStore } from '../stores';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

import TodoItem from './todoItem';

@observer
export default class TodoOverview extends React.Component {
	render() {
		if (todoStore.todos.length === 0)
			return null;
		return <section className="main">
			<input
				className="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={todoStore.activeTodoCount === 0}
			/>
			<ul className="todo-list">
				{this.getVisibleTodos().map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
					/>)
				)}
			</ul>
		</section>
	}

	getVisibleTodos() {
		return todoStore.todos.filter(todo => {
			switch (viewStore.todoFilter) {
				case ACTIVE_TODOS:
					return !todo.completed;
				case COMPLETED_TODOS:
					return todo.completed;
				default:
					return true;
			}
		});
	}

	toggleAll = (event) => {
		var checked = event.target.checked;
		todoStore.toggleAll(checked);
	};
}
