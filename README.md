# React + MOBservable TodoMVC Example

This repository provides a reference implementation of the [TodoMVC](http://todomvc.com) application written using [Mobservable](https://mweststrate.github.io/mobservable), [React](https://facebook.github.io/react) JSX and ES6.

## Running the example

```
npm install
npm start
open http://localhost:3000
```

![TodoMVC](devtools.gif)

## Changing the example

If you are new to Mobservable, take a look at the [five minute, interactive introduction](https://mweststrate.github.io/mobservable/getting-started.html) to Mobservable and React. Mobservable provides a refreshing way to manage your app state by combining mutable data structures with transparent reactive programming.

The state and actions of this app are defined in two stores; `todoModel` and `viewModel`.
This is not necessary but it provides a nice separation of concerns between data that effects the domain of the application and data that affects the user interface of the application.
This is a useful distinction for testing, reuse in backend services etc.

The project uses hot-reloading so most changes made to the app will be picked automatically.
By default the `mobservable-react-devtools` are enabled as well. During each rendering a small render report is printed on all updated components.
The dev-tools can be disabled by commenting the `import` statement in `src/index.js`.
