import TodoStore from './TodoStore';
import ViewStore from './ViewStore';

export const todoStore = new TodoStore('mobx-react-todomvc');
export const viewStore = new ViewStore();
