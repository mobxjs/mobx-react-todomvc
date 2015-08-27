import React from 'react/addons';
import {reactiveComponent} from 'mobservable-react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@reactiveComponent
export default class TodoItem extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {editText: props.todo.title};
	}

	render() {
		const {viewModel, todo} = this.props;
		return (
			<li className={React.addons.classSet({
				completed: todo.completed,
				editing: todo === viewModel.todoBeingEdited
			})}>
				<div className="view">
					<input
						className="toggle"
						type="checkbox"
						checked={todo.completed}
						onChange={this.handleToggle}
					/>
					<label onDoubleClick={this.handleEdit}>
						{todo.title}
					</label>
					<button className="destroy" onClick={this.handleDestroy} />
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.state.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</li>
		);
	}

	handleSubmit = (event) => {
		const val = this.state.editText.trim();
		if (val) {
			this.props.todo.setTitle(val);
			this.setState({editText: val});
		} else {
			this.handleDestroy();
		}
		this.props.viewModel.todoBeingEdited = null;
	}

	handleDestroy = () => {
		this.props.todo.destroy();
		this.props.viewModel.todoBeingEdited = null;
	}

	handleEdit = () => {
		const todo = this.props.todo;
		this.props.viewModel.todoBeingEdited = todo;
		this.setState({editText: todo.title});
	}

	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.setState({editText: this.props.todo.title});
			this.props.viewModel.todoBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	}

	handleChange = (event) => {
		this.setState({editText: event.target.value});
	}

	handleToggle = () => {
		this.props.todo.toggle();
	}

	/**
	 * Safely manipulate the DOM after updating the state when invoking
	 * `this.props.onEdit()` in the `handleEdit` method above.
	 * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
	 * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
	 */
	componentDidUpdate(prevProps) {
		if (!prevProps.editing && this.props.editing) {
			var node = React.findDOMNode(this.refs.editField);
			node.focus();
			node.setSelectionRange(node.value.length, node.value.length);
		}
	}
}
