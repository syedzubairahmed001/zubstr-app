import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import * as Sentry from "@sentry/browser";
import { createBrowserHistory } from "history";

import "./index.css";
import App from "./App";
import authReducer from "./store/reducers/auth";

if (process.env.REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
}
const history = createBrowserHistory();
if (process.env.REACT_APP_GA_TRACKING_ID) {
  history.listen(location => {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });
}

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;
const rootReducer = combineReducers({
  auth: authReducer
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
