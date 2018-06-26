import { observable } from "mobx";
import { ALL_TODOS } from "../constants";

export default class ViewStore {
  @observable todoBeingEdited = null;
  @observable todoFilter = ALL_TODOS;
  @observable filterTags = [];

  addFilterTag(val) {
    console.log("filter tag", val);
    this.filterTags.push(val);
    this.filterTags = [...new Set(this.filterTags)];
  }
  //called in client.js ...todos from intial state are maped.joined together with reduce and checked for duplicates
  static fromJS(array) {
    const viewStore = new ViewStore();
    // console.log(
    //   ...new Set(array.map(todo => todo.tags).reduce((a, b) => a.concat(b), []))
    // );
    viewStore.filterTags.push(
      ...new Set(array.map(todo => todo.tags).reduce((a, b) => a.concat(b), []))
    );
    return viewStore;
  }
}
