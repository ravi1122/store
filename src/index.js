import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { Provider, ReactReduxContext } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import App from "./App";

import { store, history } from "./store/configureStore";

import "./styles.scss";

// Init SVG icon library
library.add(fas, fab, far);

// Init notification system
toast.configure();

const mountTo = document.getElementById("app-root");

ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <ConnectedRouter history={history} context={ReactReduxContext}>
      <ToastContainer />
      <App />
    </ConnectedRouter>
  </Provider>,
  mountTo
);
