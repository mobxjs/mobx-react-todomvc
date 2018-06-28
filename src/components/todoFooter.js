import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { pluralize } from "../utils";
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from "../constants";

@observer
export default class TodoFooter extends React.Component {
  render() {
    const todoStore = this.props.todoStore;
    if (!todoStore.activeTodoCount && !todoStore.completedCount) return null;

    const activeTodoWord = pluralize(todoStore.activeTodoCount, "item");

    return (
      <footer>
        <div style={{ borderTop: "1px solid lightgrey" }}>
          {this.props.viewStore.filterTags.length > 0 && (
            <a
              style={filterTags}
              onClick={() => this.props.viewStore.updateActiveFilterTag("")}
            >
              Clear Tag Filter
            </a>
          )}
          {this.props.viewStore.filterTags.map((tag, i) => (
            <a
              key={i}
              style={
                this.props.viewStore.activeFilterTag === tag
                  ? activeFilterTags
                  : filterTags
              }
              onClick={e =>
                this.props.viewStore.updateActiveFilterTag(
                  e.currentTarget.innerHTML
                )
              }
            >
              {tag}
            </a>
          ))}
        </div>
        <div className="footer">
          <span className="todo-count">
            <strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
          </span>
          <ul className="filters">
            {this.renderFilterLink(ALL_TODOS, "", "All")}
            {this.renderFilterLink(ACTIVE_TODOS, "active", "Active")}
            {this.renderFilterLink(COMPLETED_TODOS, "completed", "Completed")}
          </ul>
          {todoStore.completedCount === 0 ? null : (
            <button className="clear-completed" onClick={this.clearCompleted}>
              Clear completed
            </button>
          )}
        </div>
      </footer>
    );
  }

  renderFilterLink(filterName, url, caption) {
    return (
      <li>
        <a
          href={"#/" + url}
          className={
            filterName === this.props.viewStore.todoFilter ? "selected" : ""
          }
        >
          {caption}
        </a>{" "}
      </li>
    );
  }

  clearCompleted = () => {
    this.props.todoStore.clearCompleted();
  };
}

TodoFooter.propTypes = {
  viewStore: PropTypes.object.isRequired,
  todoStore: PropTypes.object.isRequired
};

const filterTags = {
  fontSize: 16,
  margin: "5px",
  border: "solid 1px lightgrey",
  padding: "6px 12px",
  display: "inline-block",
  borderRadius: 4,

  cursor: "pointer"
};

const activeFilterTags = {
  fontSize: 16,
  margin: "5px",
  border: "solid 1px green",
  padding: "6px 12px",
  display: "inline-block",
  borderRadius: 4
};
