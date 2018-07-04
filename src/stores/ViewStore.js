import { observable } from 'mobx';
import { ALL_TODOS } from '../constants';

export default class ViewStore {
	@observable todoBeingEdited = null;
	@observable todoFilter = ALL_TODOS;
	@observable filterTags = [];
	@observable activeFilterTag = "";

	addFilterTag(val) {
		this.filterTags.push(val);
		this.filterTags = [...new Set(this.filterTags)];
	}

	updateActiveFilterTag(val) {
		this.activeFilterTag = val;
		this.todoFilter = val;
	}

	//called in client.js ...todos from intial state are maped.joined together with reduce and checked for duplicates
	static fromJS(array) {
		const viewStore = new ViewStore();
		viewStore.filterTags.push(
			...new Set(array.map(todo => todo.tags).reduce((a, b) => a.concat(b), []))
		);
		return viewStore;
	}
}