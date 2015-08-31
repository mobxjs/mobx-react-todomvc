import React from 'react';
import {reactiveComponent} from 'mobservable-react';
import {Router} from 'director';

import TodoEntry from './todoEntry';
import TodoOverview from './todoOverview';
import TodoFooter from './todoFooter';
import * as ViewModel from '../stores/viewModel';

@reactiveComponent
export default class TodoApp extends React.Component {
	render() {
		const {todoModel, viewModel} = this.props;
		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<TodoEntry todoModel={todoModel} />
				</header>
				<TodoOverview todoModel={todoModel} viewModel={viewModel} />
				<TodoFooter todoModel={todoModel} viewModel={viewModel} />
			</div>
		);
	}

	componentDidMount() {
		var viewModel = this.props.viewModel;
		var router = Router({
			'/': function() { viewModel.todoFilter = ViewModel.ALL_TODOS; },
			'/active': function() { viewModel.todoFilter = ViewModel.ACTIVE_TODOS; },
			'/completed': function() { viewModel.todoFilter = ViewModel.COMPLETED_TODOS; }
		});
		router.init('/');
	}
}
