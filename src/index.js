import React from "react";
import ReactDOM from "react-dom";
import TagManager from "react-gtm-module";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider, useDispatch } from "react-redux";
import * as Sentry from "@sentry/browser";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import * as actionTypes from "./store/actions/action-types";
import "./index.css";
import App from "./App";
import authReducer from "./store/reducers/auth";
import globalReducer from "./store/reducers/global";
import instituteGroupReducer from "./store/reducers/instituteGroup";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


if (process.env.REACT_APP_GA_TRACKING_ID) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
}
const history = createBrowserHistory();
history.listen(location => {
  if (!location.pathname.includes("/auth/")) {
    localStorage.setItem("c-url", location.pathname);
  }
  if (process.env.REACT_APP_GA_TRACKING_ID) {
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  }
});
if (process.env.REACT_APP_GMT_ID) {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GMT_ID
  };

  TagManager.initialize(tagManagerArgs);
}



if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });
}

const composeEnhancers =
  (process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null) || compose;
const rootReducer = combineReducers({
  auth: authReducer,
  global: globalReducer,
  instituteGroup: instituteGroupReducer
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <Elements stripe={stripePromise}>
      <Router history={history}>
        <App />
      </Router>
    </Elements>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
