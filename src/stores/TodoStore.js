import {observable, computed, autorun} from 'mobx';
import TodoModel from '../models/TodoModel'
import * as Utils from '../utils';

export default class TodoStore {
	key;
	@observable todos = [];

	constructor(key) {
		this.key = key;

		this.readFromLocalStorage();
		this.subscribeLocalStorageToModel();
	}

	@computed get activeTodoCount() {
		return this.todos.reduce(
			(sum, todo) => sum + (todo.completed ? 0 : 1),
			0
		)
	}

	@computed get completedCount() {
		return this.todos.length - this.activeTodoCount;
	}

	readFromLocalStorage(model) {
		this.todos = Utils.getDataFromLocalStore(this.key).map(
			data => TodoModel.fromJson(this, data)
		);
	}

	subscribeLocalStorageToModel(model) {
		autorun(() =>
			Utils.storeDataToLocalStore(this.key, this.todos.map(todo => todo.toJson()))
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
}
