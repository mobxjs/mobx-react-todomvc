import {observable} from 'mobx';

export default class TodoModel {
	store;
	id;
	@observable title;
	@observable completed;
	@observable important;

	constructor(store, id, title, completed, important) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.completed = completed;
		this.important = important;
	}

	toggle() {
		this.completed = !this.completed;
	}

	toggleImportant() {
		this.important = !this.important;
	}

	destroy() {
		this.store.todos.remove(this);
	}

	setTitle(title) {
		this.title = title;
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			completed: this.completed,
			important: this.important,
		};
	}

	static fromJS(store, object) {
		return new TodoModel(store, object.id, object.title, object.completed, object.important);
	}
}
