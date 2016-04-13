import React from 'react';
import {observer} from 'mobx-react';
import {pluralize} from '../utils';
import {RefreshLink} from 'navigation-react';
import * as ViewModel from '../stores/viewModel';

@observer
export default class TodoFooter extends React.Component {
	render() {
		const {todoModel, stateNavigator} = this.props;
		if (!todoModel.activeTodoCount && !todoModel.completedCount)
			return null;

		const activeTodoWord = pluralize(todoModel.activeTodoCount, 'item');

		return (
			<footer className="footer">
				<span className="todo-count">
					<strong>{todoModel.activeTodoCount}</strong> {activeTodoWord} left
				</span>
				<ul className="filters">
					<li>
						<RefreshLink
							navigationData={{filter: ViewModel.ALL_TODOS}}
							stateNavigator={stateNavigator}
							activeCssClass="selected">
							All
						</RefreshLink>
					</li>
					<li>
						<RefreshLink
							navigationData={{filter: ViewModel.ACTIVE_TODOS}}
							stateNavigator={stateNavigator}
							activeCssClass="selected">
							Active
						</RefreshLink>
					</li>
					<li>
						<RefreshLink
							navigationData={{filter: ViewModel.COMPLETED_TODOS}}
							stateNavigator={stateNavigator}
							activeCssClass="selected">
							Completed
						</RefreshLink>
					</li>
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

	clearCompleted = () => {
		this.props.todoModel.clearCompleted();
	};
}

TodoFooter.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	todoModel: React.PropTypes.object.isRequired
}
