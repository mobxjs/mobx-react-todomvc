import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { observable, expr } from "mobx";
import { STATUS_CODES } from "http";

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export default class TodoItem extends React.Component {
  @observable editText = "";

  render() {
    const { viewStore, todo } = this.props;
    return (
      <li
        className={[
          todo.completed ? "completed" : "",
          expr(() => (todo === viewStore.todoBeingEdited ? "editing" : ""))
        ].join(" ")}
      >
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={this.handleToggle}
          />
          <label onDoubleClick={this.handleEdit}>{todo.title}</label>
          {todo.tags.map(tag => (
            <span
              key={todo.id + "-" + tag}
              data-key={todo.id + "-" + tag}
              style={todoTag}
            >
              {tag}
            </span>
          ))}
          <button className="destroy" onClick={this.handleDestroy} />
          <button
            name="tagSubmitBtn"
            style={addBtnStyle}
            onClick={this.handleTagSubmitByButton}
          >
            +
          </button>
          <input
            ref="tagInput"
            name="tagInput"
            type="text"
            placeholder="Enter Tag"
            style={tagInput}
            ref="tagField"
            onKeyDown={this.handleTagInputKeyDown}
          />
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

  handleTagInputKeyDown = event => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = ReactDOM.findDOMNode(this.refs.tagField).value.trim();

    if (val) {
      this.props.todo.addTag(val);
      ReactDOM.findDOMNode(this.refs.tagField).value = "";
    }
  };

  handleTagSubmitByButton = () => {
    console.log("add tag input");
  };

  handleSubmit = event => {
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

  handleKeyDown = event => {
    if (event.which === ESCAPE_KEY) {
      this.editText = this.props.todo.title;
      this.props.viewStore.todoBeingEdited = null;
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleChange = event => {
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

const addBtnStyle = {
  position: "absolute",
  display: "inline",
  background: "lightgreen",
  right: "-210px",
  top: "50%",
  transform: "translateY(-50%)",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)"
};

const tagInput = {
  position: "absolute",
  display: "inline",
  background: "white",
  right: "-170px",
  width: "150px",
  top: "50%",
  transform: "translateY(-50%)",
  borderRadius: "4px",
  border: "1px solid lightgrey",
  height: "30px",
  padding: "5px",
  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)"
};

const todoTag = {
  fontSize: 16,
  margin: "5px",
  border: "solid 1px grey",
  padding: "6px 12px",
  display: "inline-block",
  borderRadius: 4
};
