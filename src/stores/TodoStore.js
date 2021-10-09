import {makeObservable, observable, computed, reaction, action} from 'mobx';
import TodoModel from '../models/TodoModel'
import * as Utils from '../utils';


export default class TodoStore {

  constructor() {
    makeObservable(this, {
      todos: observable,
      activeTodoCount: computed,
      completedCount: computed,
      addTodo: action.bound,
      toggleAll: action.bound,
      clearCompleted: action.bound
    });
  }

  todos = [];

  get activeTodoCount() {
    return this.todos.reduce(
      (sum, todo) => sum + (todo.completed ? 0 : 1),
      0
    )
  }

  get completedCount() {
    return this.todos.length - this.activeTodoCount;
  }

  subscribeServerToStore() {
    reaction(
      () => this.toJS(),
      todos => window.fetch && fetch('/api/todos', {
	method: 'post',
	body: JSON.stringify({ todos }),
	headers: new Headers({ 'Content-Type': 'application/json' })
      })
    );
  }

  addTodo (title) {
    this.todos.push(new TodoModel(this, Utils.uuid(), title, false));
  }

  toggleAll (checked) {
    this.todos.forEach(
      todo => todo.completed = checked
    );
  }

  clearCompleted () {
    this.todos = this.todos.filter(
      todo => !todo.completed
    );
  }

  toJS() {
    return this.todos.map(todo => todo.toJS());
  }

  static fromJS(array) {
    const todoStore = new TodoStore();
    todoStore.todos = array.map(item => TodoModel.fromJS(todoStore, item));
    return todoStore;
  }
}
