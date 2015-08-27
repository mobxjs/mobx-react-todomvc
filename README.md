# React + MOBservable TodoMVC Example

> React is a JavaScript library for creating user interfaces. Its core principles are declarative code, efficiency, and flexibility. Simply specify what your component looks like and React will keep it up-to-date when the underlying data changes.

> _[React - facebook.github.io/react](http://facebook.github.io/react)_

> MOBservable is light-weight stand-alone library to create reactive primitives, functions, arrays and objects. Its goal is to make developers happy and productive. It loves React.

> _[MOBservable](https://github.com/mweststrate/MOBservable)_

## Learning React

The [React getting started documentation](http://facebook.github.io/react/docs/getting-started.html) is a great way to get started.

Here are some links you may find helpful:

* [Documentation](http://facebook.github.io/react/docs/getting-started.html)
* [API Reference](http://facebook.github.io/react/docs/reference.html)

## Learning MOBservable

The examples in the documentation are probably the best place to get started.

* [MOBservable readme with examples](https://github.com/mweststrate/MOBservable/blob/master/README.md)
* [Philosophy and in-depth analysis of MOBservable](https://www.mendix.com/tech-blog/making-react-reactive-pursuit-high-performing-easily-maintainable-react-apps/)

_If you have any questions or issues concerning this example of MOBservable in general, just file an issue at the [github repo](https://github.com/mweststrate/MOBservable/issues)_


react-mobservable-boilerplate
=====================

A minimal todo application, that uses reactive data structures and components that observe their data.
Powered by [mobservable](http://mweststrate.github.io/mobservable).

### Run the example

```
npm install
npm start
open http://localhost:3000
```

The file `src/todos.js` provides a simple implementation of a todo list using observable data structures.
The file `src/components.js` defines the `TodoList` and `TodoView` components. Although dumb, they do respond to data changes automatically. Changes to this file will be hot reloaded in the browser.

### Credits

* This template is based on [react-hot-boilerplate](https://github.com/gaearon/react-hot-boilerplate) by Dan Abramov.
* [Mendix](http://github.com/mendix) for providing the opportunity to battle test this approach (we're hiring!).
