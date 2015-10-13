import {extendObservable} from 'mobservable';

export const ALL_TODOS = 'all';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';

export default class ViewModel {
	constructor() {
		extendObservable(this, {
			 todoBeingEdited: null,
			 todoFilter: ALL_TODOS
		});
	}
}
