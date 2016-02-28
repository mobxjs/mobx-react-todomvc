import {observable} from 'mobx';

export const ALL_TODOS = 'all';
export const ACTIVE_TODOS = 'active';
export const COMPLETED_TODOS = 'completed';

export default class ViewModel { 
	@observable todoBeingEdited = null;
	@observable todoFilter= ALL_TODOS;
}
