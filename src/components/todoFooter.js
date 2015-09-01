import React from 'react';
import {reactiveComponent} from 'mobservable-react';
import {pluralize} from '../utils';
import * as ViewModel from '../stores/viewModel';

@reactiveComponent
export default class TodoFooter extends React.Component {
	render() {
		const todoModel = this.props.todoModel;
		if (!todoModel.activeTodoCount && !todoModel.completedCount)
			return null;

		const activeTodoWord = pluralize(todoModel.activeTodoCount, 'item');

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{todoModel.activeTodoCount}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
						{this.renderFilterLink(ViewModel.ALL_TODOS, "", "All")}
						{this.renderFilterLink(ViewModel.ACTIVE_TODOS, "active", "Active")}
						{this.renderFilterLink(ViewModel.COMPLETED_TODOS, "completed", "Completed")}
				</ul>
				{ todoModel.completedCount === 0
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

	renderFilterLink(filterName, url, caption) {
		return (<li>
			<a href={"#/" + url}
				className={filterName ===  this.props.viewModel.todoFilter ? "selected" : ""}>
				{caption}
			</a>
			{' '}
		</li>)
	}

	clearCompleted = () => {
		this.props.todoModel.clearCompleted();
	}
}

TodoFooter.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	todoModel: React.PropTypes.object.isRequired
}
