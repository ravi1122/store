# S7: Intro `redux` - Actions, Types, Reducers and Store

## [Redux](https://redux.js.org/introduction/getting-started) - A Predictable State Container for JS Apps

## [React-Redux](https://react-redux.js.org/introduction/quick-start) - React Redux is the official React binding for Redux. It lets your React components read data from a Redux store, and dispatch actions to the store to update data.

## [Redux-Thunk](https://github.com/reduxjs/redux-thunk) - With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extend the store's abilities, and let you write async logic that interacts with the store.

## [Redux-Logger](https://github.com/LogRocket/redux-logger) - Logger for Redux

## [connected-react-router](https://github.com/supasate/connected-react-router) - A Redux binding for React Router

## 3 Main things in Redux

- Store
- Actions
- - An action is a plain simple object, like `{type: "ADD_TODO", text: "Buy milk"}`.
- - An action type is the value for the type field in an action. Per the Redux FAQ, this field should be a string, although Redux only enforces that a type field exists in the action.
- - An action creator is a function that returns an action, like:
- - ```js
    function addTodo(text) {
      return {
        type: "ADD_TODO",
        text,
      };
    }
    ```

- Reducers

## Installation

- `$yarn add redux react-redux redux-logger redux-thunk connected-react-router`

## Run below code from official redux documentation to check how it works

```js
import { createStore } from "redux";

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => console.log(store.getState()));

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: "INCREMENT" });
// 1
store.dispatch({ type: "INCREMENT" });
// 2
store.dispatch({ type: "DECREMENT" });
// 1
```

## Integrating redux with your react app

- To integrate Redux with React we need a binding library called `react-redux`]
- Also we will be using some middlewares for Redux i.e. `redux-logger`, `redux-thunk`
- Along with all these modules we will use `connected-react-router` to sync the redux and router

- By using all this tools we will create a simple counter page first and then we will use it for login/register functionalities
- Also remove the use of `Redirect` component from `Login` component and use `push` action from `connected-react-router`

## Verify

- Your new counter page should work as expected - Done
- Your login/register functionalities should work as expected - Done
- Your redirection should as expected for login - Done
