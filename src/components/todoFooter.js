import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {action} from 'mobx';
import {pluralize} from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, IMPORTANT_TODOS } from '../constants';

@observer
export default class TodoFooter extends React.Component {
	render() {
		const todoStore = this.props.todoStore;
		if (!todoStore.activeTodoCount && !todoStore.completedCount)
			return null;

		const activeTodoWord = pluralize(todoStore.activeTodoCount, 'item');

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					{this.renderFilterLink(ALL_TODOS)}
					{this.renderFilterLink(ACTIVE_TODOS)}
					{this.renderFilterLink(COMPLETED_TODOS)}
					{this.renderFilterLink(IMPORTANT_TODOS)}
				</ul>
				{ todoStore.completedCount === 0
					? null
					: 	<button
							className="clear-completed"
							onClick={this.clearCompleted}>
							Clear completed
						</button>
				}
			</footer>
		);
	}

	renderFilterLink(filterName) {
		return (<li>
			<button onClick={() => this.props.viewStore.toggleView(filterName)}
				className={this.props.viewStore.todoFilters.includes(filterName) ? "selected" : ""}>
				{filterName}
			</button>
			{' '}
		</li>)
	}

	@action
	clearCompleted = () => {
		this.props.todoStore.clearCompleted();
	};
}

TodoFooter.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
}
