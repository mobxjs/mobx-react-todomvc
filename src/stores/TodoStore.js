import {observable, computed, reaction, action} from 'mobx';
import TodoModel from '../models/TodoModel'
import * as Utils from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, IMPORTANT_TODOS } from '../constants';


export default class TodoStore {
	@observable todos = [];

	@computed get activeTodoCount() {
		return this.todos.reduce(
			(sum, todo) => sum + (todo.completed ? 0 : 1),
			0
		)
	}

	@computed get completedCount() {
		return this.todos.length - this.activeTodoCount;
	}

	@computed get rangeOfTags() {
		let tags = new Set([ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS, IMPORTANT_TODOS]);
		for(let i = 0; i < this.todos.length; i++) {
			const todo = this.todos[i];
			for(let j = 0; j < todo.tags.length; j++) {
				tags.add(todo.tags[j]);
			}
		}
		return Array.from(tags);
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

	@action
	addTodo (title) {
		this.todos.push(new TodoModel(this, Utils.uuid(), title, []));
	}

	@action
	toggleAll (checked) {
		this.todos.forEach(
			todo => todo.completed = checked
		);
	}

	@action
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
