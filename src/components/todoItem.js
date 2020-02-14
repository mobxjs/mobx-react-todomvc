import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {observable, action, computed} from 'mobx';
const ESCAPE_KEY = 27;
const ENTER_KEY = 13;
import { COMPLETED_TODOS } from '../constants';

@observer
export default class TodoItem extends React.Component {
	@observable editText = "";

	render() {
		const {todo} = this.props;

		console.log(todo.tag)
		return (
			<li className={[
				todo.completed ? "completed": "",
				this.isBeingEdited ? "editing" : ""
			].join(" ")}>
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
					<ul className="tags">
						{todo.tags.filter(t => t !==  COMPLETED_TODOS).map(t => this.renderTag(t))}
					</ul>
					<button className="new-tag" onClick={this.handleNewTag} />
					<button className="destroy" onClick={this.handleDestroy} />
				</div>
				<input
					ref="editField"
					className="edit"
					value={this.editText}
					onBlur={this.handleSubmit}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
			</li>
		);
	}

	renderTag(name) {
		return (<li key={name}>
			<button onClick={() => this.props.todo.toggleTag(name)}>
				{name}
			</button>
			{' '}
		</li>)
	}

	@computed
	get isBeingEdited() {
		return this.props.viewStore.todoBeingEdited === this.props.todo
	}

	@action
	handleSubmit = (event) => {
		const val = this.editText.trim();
		if (val) {
			this.props.todo.setTitle(val);
			this.editText = val;
		} else {
			this.handleDestroy();
		}
		this.props.viewStore.todoBeingEdited = null;
	};

	@action
	handleDestroy = () => {
		this.props.todo.destroy();
		this.props.viewStore.todoBeingEdited = null;
	};

	@action
	handleEdit = () => {
		const todo = this.props.todo;
		this.props.viewStore.todoBeingEdited = todo;
		this.editText = todo.title;
	};

	@action
	handleKeyDown = (event) => {
		if (event.which === ESCAPE_KEY) {
			this.editText = this.props.todo.title;
			this.props.viewStore.todoBeingEdited = null;
		} else if (event.which === ENTER_KEY) {
			this.handleSubmit(event);
		}
	};

	@action
	handleChange = (event) => {
		this.editText = event.target.value;
	};

	@action
	handleToggle = () => {
		this.props.todo.toggleTag(COMPLETED_TODOS);
	};

	@action
	handleNewTag = () => {
		const tagStr = prompt("enter new tag");
		if(!this.props.todoStore.rangeOfTags.includes(tagStr)) {
			this.props.todo.toggleTag(tagStr);
		}
	}
}

TodoItem.propTypes = {
	todo: PropTypes.object.isRequired,
	viewStore: PropTypes.object.isRequired,
	todoStore: PropTypes.object.isRequired,
};
