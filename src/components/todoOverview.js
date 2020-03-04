import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS, ALL_TODOS } from '../constants';

import TodoItem from './todoItem';

@observer
export default class TodoOverview extends React.Component {
	render() {
		const {todoStore, viewStore} = this.props;
		if (todoStore.todos.length === 0)
			return null;
		return <section className="main">
			<input
				className="toggle-all" // this image doen't make sense to me...
				id="toggle-all"
				type="checkbox"
				onChange={this.toggleAll}
				checked={todoStore.activeTodoCount === 0}
			/>
			<label htmlFor="toggle-all"></label>
			<ul className="todo-list">
				{this.getVisibleTodos().map(todo =>
					(<TodoItem
						key={todo.id}
						todo={todo}
						viewStore={viewStore}
						todoStore={todoStore}
					/>)
				)}
			</ul>
		</section>
	}

	getVisibleTodos() {
		return this.props.todoStore.todos.filter(todo => {
			for(let i = 0; i < this.props.viewStore.todoFilters.length; i++) {
				const filter = this.props.viewStore.todoFilters[i];
				let res = null;
				switch (filter) {
					case ALL_TODOS:
						res = true;
						break;
					case ACTIVE_TODOS:
						res = !todo.tags.includes(COMPLETED_TODOS);
						break;
					case COMPLETED_TODOS:
						res = todo.tags.includes(COMPLETED_TODOS);
						break;
					default:
						res = todo.tags.includes(filter);
				}
				if(res) {
					return true;
				}
			}
			return false;
		});
	}

	toggleAll = (event) => {
		var checked = event.target.checked;
		this.props.todoStore.toggleAll(checked);
	};
}


TodoOverview.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
}
