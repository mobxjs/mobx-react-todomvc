import React from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';
import {makeObservable, action} from 'mobx';
import {pluralize} from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';

class TodoFooter extends React.Component {
  constructor(props) {
    super(props);
    makeObservable(this, {
      clearCompleted: action.bound
    });
  }

  render() {
    const todoStore = this.props.todoStore;
    if (!todoStore.activeTodoCount && !todoStore.completedCount)
      return null;

    const activeTodoWord = pluralize(todoStore.activeTodoCount, 'item');

    return (
      <footer className="footer">
	<span className="todo-count">
	  <strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
	</span>
	<ul className="filters">
	  {this.renderFilterLink(ALL_TODOS, "", "All")}
	  {this.renderFilterLink(ACTIVE_TODOS, "active", "Active")}
	  {this.renderFilterLink(COMPLETED_TODOS, "completed", "Completed")}
	</ul>
	{ todoStore.completedCount === 0
	  ? null
	  : 	<button
		  className="clear-completed"
		  onClick={this.clearCompleted}>
		  Clear completed
		</button>
	}
      </footer>
    );
  }

  renderFilterLink(filterName, url, caption) {
    return (<li>
	      <a href={"#/" + url}
		 className={filterName ===  this.props.viewStore.todoFilter ? "selected" : ""}>
		{caption}
	      </a>
	      {' '}
	    </li>)
  }

  clearCompleted = () => {
    this.props.todoStore.clearCompleted();
  };
}

TodoFooter.propTypes = {
  viewStore: PropTypes.object.isRequired,
  todoStore: PropTypes.object.isRequired
}

export default observer(TodoFooter);
