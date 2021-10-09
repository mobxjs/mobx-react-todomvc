import {makeObservable, observable, action} from 'mobx';
import { ALL_TODOS } from '../constants';

export default class ViewStore {
  todoBeingEdited = null;
  todoFilter= ALL_TODOS;

  constructor() {
    makeObservable(this, {
      todoBeingEdited: observable,
      todoFilter: observable,
      setTodoFilter: action.bound
    });
  }

  setTodoFilter(todoFilter) {
    this.todoFilter = todoFilter
  }
}
