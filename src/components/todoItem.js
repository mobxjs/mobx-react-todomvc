import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {makeObservable, action, computed} from 'mobx';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    makeObservable(this, {
      isBeingEdited: computed,
      handleSubmit: action.bound,
      handleDestroy: action.bound,
      handleEdit: action.bound,
      handleKeyDown: action.bound,
      handleChange: action.bound,
      handleToggle: action.bound
    });
  }

  render() {
    const {todo} = this.props;
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

  get isBeingEdited() {
    return this.props.viewStore.todoBeingEdited === this.props.todo
  }

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

  handleDestroy = () => {
    this.props.todo.destroy();
    this.props.viewStore.todoBeingEdited = null;
  };

  handleEdit = () => {
    const todo = this.props.todo;
    this.props.viewStore.todoBeingEdited = todo;
    this.editText = todo.title;
  };

  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.editText = this.props.todo.title;
      this.props.viewStore.todoBeingEdited = null;
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleChange = (event) => {
    this.editText = event.target.value;
  };

  handleToggle = () => {
    this.props.todo.toggle();
  };
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  viewStore: PropTypes.object.isRequired
};

export default observer(TodoItem);
