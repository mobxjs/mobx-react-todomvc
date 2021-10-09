import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {makeObservable, action} from 'mobx';

const ENTER_KEY = 13;

class TodoEntry extends React.Component {

  constructor(props) {
    super(props);
    makeObservable(this, {
      handleNewTodoKeyDown: action.bound
    });
  }

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

    var val = ReactDOM.findDOMNode(this.refs.newField).value.trim();

    if (val) {
      this.props.todoStore.addTodo(val);
      ReactDOM.findDOMNode(this.refs.newField).value = '';
    }
  };
};

TodoEntry.propTypes = {
  todoStore: PropTypes.object.isRequired
};

export default observer(TodoEntry);
