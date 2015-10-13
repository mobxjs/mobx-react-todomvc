import {observable, autorun} from 'mobservable';
import * as Utils from '../utils';

export class TodoModel {
	constructor(key) {
		observable(this, {
			key,
			todos: [],
			activeTodoCount: () =>
				this.todos.reduce(
					(sum, todo) => sum + (todo.completed ? 0 : 1),
					0
				)
			,
			completedCount: () => this.todos.length - this.activeTodoCount
		});

		this.readFromLocalStorage();
		this.subscribeLocalStorageToModel();
	}

	readFromLocalStorage(model) {
		this.todos = Utils.getDataFromLocalStore(this.key).map(
			data => Todo.fromJson(this, data)
		);
	}

	subscribeLocalStorageToModel(model) {
		autorun(() =>
			Utils.storeDataToLocalStore(this.key, this.todos.map(todo => todo.toJson()))
		);
	}

	addTodo (title) {
		this.todos.push(new Todo(this, Utils.uuid(), title, false));
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

export class Todo {
	constructor(store, id, title, completed) {
		this.store = store;
		observable(this, { id, title, completed });
	}

	toggle() {
		this.completed = !this.completed;
	}

	destroy() {
		this.store.todos.remove(this);
	}

	setTitle(title) {
		this.title = title;
	}

	toJson() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed
		};
	}

	static fromJson(store, json) {
		return new Todo(store, json.id, json.title, json.completed);
	}
}
