import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
import Helmet from "react-helmet";
import { useTransition, animated } from "react-spring";
import { ThemeProvider } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import { Route, Switch, Redirect, __RouterContext } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import theme from "./theme/theme-light";
import { authCheckState } from "./store/actions/auth";
import Auth from "./containers/Auth/Auth";
import Public from "./containers/Public/Public";
import AppLoading from "./components/AppLoading/AppLoading";


const Institute = lazy(() => import("./containers/Institute/Institute"));


const lazyLoad = Component => {
  return props => (
    <Suspense fallback={<AppLoading />}>
      <Component {...props} />
    </Suspense>
  );
};

const App = props => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);

  let routes = !isAuth ? (
    <>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/public" component={Public} />s
        <Redirect to="/auth/login" />
      </Switch>
    </>
  ) : (
    <>
      <Switch>
        <Route path="/i" component={lazyLoad(Institute)} />
        <Redirect to="/i/dashboard" />
      </Switch>
    </>
  );
  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>Zubstr</title>
        <meta
          name="description"
          content="Login or Signup to your Zubstr account. Zubstr is an intstitute network application"
        />
      </Helmet>
      <div className="App">{routes}</div>
    </ThemeProvider>
  );
};

// const mapStateToProps = state => ({
//   isAuth: state.auth.isAuth
// });

// const mapDispatchToProps = {
//   authCheckState
// };

export default App;
