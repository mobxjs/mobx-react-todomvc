import React from 'react';
import {observer} from 'mobx-react';
import {Router} from 'director';

import TodoEntry from './todoEntry';
import TodoOverview from './todoOverview';
import TodoFooter from './todoFooter';

import DevTool from 'mobx-react-devtools';

import { viewStore } from '../stores';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

@observer
export default class TodoApp extends React.Component {
	render() {
		return (
			<div>
				<DevTool />
				<header className="header">
					<h1>todos</h1>
					<TodoEntry />
				</header>
				<TodoOverview />
				<TodoFooter />
			</div>
		);
	}

	componentDidMount() {
		var router = Router({
			'/': function() { viewStore.todoFilter = ALL_TODOS; },
			'/active': function() { viewStore.todoFilter = ACTIVE_TODOS; },
			'/completed': function() { viewStore.todoFilter = COMPLETED_TODOS; }
		});
		router.init('/');
	}
}
