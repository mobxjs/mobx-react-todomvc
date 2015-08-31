import React from 'react';
import {reactiveComponent} from 'mobservable-react';

const ENTER_KEY = 13;

@reactiveComponent
export default class TodoEntry extends React.Component {
	render() {
		return (<input
			ref="newField"
			className="new-todo"
			placeholder="What needs to be done?"
			onKeyDown={this.handleNewTodoKeyDown}
			autoFocus={true}
		/>);
	}

	handleNewTodoKeyDown = (event) => {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = React.findDOMNode(this.refs.newField).value.trim();

		if (val) {
			this.props.todoModel.addTodo(val);
			React.findDOMNode(this.refs.newField).value = '';
		}
	}
}
