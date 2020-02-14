import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import TodoEntry from './todoEntry';
import TodoOverview from './todoOverview';
import TodoFooter from './todoFooter';

import DevTool from 'mobx-react-devtools';

@observer
export default class TodoApp extends React.Component {
	render() {
		const {todoStore, viewStore} = this.props;
		return (
			<div>
				<DevTool />
				<header className="header">
					<h1>todos</h1>
					<TodoEntry todoStore={todoStore} />
				</header>
				<TodoOverview todoStore={todoStore} viewStore={viewStore} />
				<TodoFooter todoStore={todoStore} viewStore={viewStore} />
			</div>
		);
	}

	componentDidMount() {
		if (__CLIENT__) {
			var { Router } = require('director/build/director');
			var router = Router({});
			router.init('/');
		}
	}
}

TodoApp.propTypes = {
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired
};
