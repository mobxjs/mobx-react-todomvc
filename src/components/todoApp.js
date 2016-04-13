import React from 'react';
import {observer} from 'mobx-react';

import TodoEntry from './todoEntry';
import TodoOverview from './todoOverview';
import TodoFooter from './todoFooter';

import DevTool from 'mobx-react-devtools';

@observer
export default class TodoApp extends React.Component {
	render() {
		const {todoModel, viewModel, stateNavigator} = this.props;
		return (
			<div>
				<DevTool />
				<header className="header">
					<h1>todos</h1>
					<TodoEntry todoModel={todoModel} />
				</header>
				<TodoOverview todoModel={todoModel} viewModel={viewModel} />
				<TodoFooter
					todoModel={todoModel}
					viewModel={viewModel}
					stateNavigator={stateNavigator}
				/>
			</div>
		);
	}

	componentDidMount() {
		var viewModel = this.props.viewModel;
		var stateNavigator = this.props.stateNavigator;
		stateNavigator.states.todo.navigated = function(data) {
			viewModel.todoFilter = data.filter;
		}
		stateNavigator.start();
	}
}

TodoApp.propTypes = {
	viewModel: React.PropTypes.object.isRequired,
	todoModel: React.PropTypes.object.isRequired
}
