import React from 'react/addons';
import {reactiveComponent} from 'mobservable-react';
import * as Utils from '../utils';
import * as ViewModel from '../stores/viewModel';

@reactiveComponent
export default class TodoFooter extends React.Component {
	render() {
		const todoModel = this.props.todoModel;
		const todoFilter = this.props.viewModel.todoFilter;

		if (!todoModel.activeTodoCount && !todoModel.completedCount)
			return null;

		const activeTodoWord = Utils.pluralize(todoModel.activeTodoCount, 'item');
		let clearButton = null;

		if (todoModel.completedCount > 0) {
			clearButton = (
				<button
					className="clear-completed"
					onClick={this.clearCompleted}>
					Clear completed
				</button>
			);
		}

		const cx = React.addons.classSet;
		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{todoModel.activeTodoCount}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					<li>
						<a
							href="#/"
							className={cx({selected: todoFilter === ViewModel.ALL_TODOS})}>
								All
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#/active"
							className={cx({selected: todoFilter === ViewModel.ACTIVE_TODOS})}>
								Active
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#/completed"
							className={cx({selected: todoFilter === ViewModel.COMPLETED_TODOS})}>
								Completed
						</a>
					</li>
				</ul>
				{clearButton}
			</footer>
		);
	}

	clearCompleted = () => {
		this.props.todoModel.clearCompleted();
	}
}
