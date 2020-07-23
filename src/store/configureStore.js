import { routerMiddleware } from "connected-react-router";
import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers";

// import { getInitialState } from "../server";

export const history = createBrowserHistory();

const middlewares = [
  routerMiddleware(history), // for dispatching history actions
  thunk,
];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(createLogger());
}

export const store = createStore(
  reducers(history),
  // getInitialState,
  applyMiddleware(...middlewares)
);
