import { observable, computed, reaction } from 'mobx';
import TodoModel from '../models/TodoModel'
import * as Utils from '../utils';


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

	subscribeLocalstorageToStore() {
		reaction(
			() => this.toJS(),
			todos => localStorage.setItem('mobx-react-todomvc-todos', JSON.stringify({ todos }))
		);
	}

	addTodo(title) {
		let tags = [];
		this.todos.push(new TodoModel(this, Utils.uuid(), title, false, tags));
	}

	addTag = (val, id) => {
		this.todos.forEach(todo => {
			if (todo.id === id) {
				this.todos.remove(todo);
				const tags = [...todo.tags, val];
				this.todos.push(
					new TodoModel(this, Utils.uuid(), todo.title, false, tags)
				);
			}
		});
	};

	toggleAll(checked) {
		this.todos.forEach(
			todo => todo.completed = checked
		);
	}

	clearCompleted() {
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
