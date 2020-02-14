import {observable, action} from 'mobx';

export default class TodoModel {
	store;
	id;
	@observable title;
	@observable tags = [];

	constructor(store, id, title, tags) {
		this.store = store;
		this.id = id;
		this.title = title;
		this.tags = tags || this.tags;
	}

	@action
	toggleTag(tag) {
		if(this.tags.includes(tag)) {
			this.tags = this.tags.filter(t => t !== tag);
		} else {
			this.tags.push(tag);
		}
		console.log(this.tags)
	}

	destroy() {
		this.store.todos.remove(this);
	}

	@action
	setTitle(title) {
		this.title = title;
	}

	toJS() {
		return {
			id: this.id,
			title: this.title,
			tags: this.tags,
		};
	}

	static fromJS(store, object) {
		return new TodoModel(store, object.id, object.title, object.tags);
	}
}
