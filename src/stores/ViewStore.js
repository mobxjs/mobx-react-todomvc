import {observable} from 'mobx';
import { ALL_TODOS } from '../constants';

export default class ViewStore {
	@observable todoBeingEdited = null;
	@observable todoFilters = [ALL_TODOS];

	toggleView(filter) {
		if(this.todoFilters.includes(filter)) {
			this.todoFilters = this.todoFilters.filter(f => f !== filter);
		} else {
			this.todoFilters.push(filter);
		}
	}
}