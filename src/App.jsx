import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
import Helmet from "react-helmet";
import { useTransition, animated } from "react-spring";
import { ThemeProvider } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import lightTheme from "./theme/theme-light";
import darkTheme from "./theme/theme-dark";
import { authCheckState } from "./store/actions/auth";
import Auth from "./containers/Auth/Auth";
import Public from "./containers/Public/Public";
import AppLoading from "./components/AppLoading/AppLoading";

const Institute = lazy(() => import("./containers/Institute/Institute"));
const Admin = lazy(() => import("./containers/Admin/Admin"));

const lazyLoad = Component => {
  return props => (
    <Suspense fallback={<AppLoading />}>
      <Component {...props} />
    </Suspense>
  );
};

const App = props => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const isGlobalLoading = useSelector(state => state.global.isLoading);
  const currentTheme = useSelector(state => state.global.theme);
  const user = useSelector(state => state.auth.user) || null;
  let authRedirect = localStorage.getItem("c-url");
  const { isAdmin } = user || {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckState());
  }, [dispatch]);
  let routes;
  if (isGlobalLoading) {
    routes = <AppLoading />;
  } else if (!isAuth) {
    routes = (
      <>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/public" component={Public} />
          <Redirect to="/auth/login" />
        </Switch>
      </>
    );
  } else if (isAdmin) {
    routes = (
      <>
        <Switch>
          <Route path="/a" component={lazyLoad(Admin)} />
          {authRedirect && authRedirect.indexOf("/a/") > -1 ? (
            <Redirect to={authRedirect} />
          ) : (
            <Redirect to="/a/dashboard" />
          )}
        </Switch>
      </>
    );
  } else {
    routes = (
      <>
        <Switch>
          <Route path="/i" component={lazyLoad(Institute)} />
          {authRedirect && authRedirect.indexOf("/i/") > -1 ? (
            <Redirect to={authRedirect} />
          ) : (
            <Redirect to="/i/dashboard" />
          )}
        </Switch>
      </>
    );
  }
  const theme = currentTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      {currentTheme === 'dark' ? document.querySelector('body').classList.add('dark-bg') : document.querySelector('body').classList.remove('dark-bg') }
      <Helmet>
        <title>Zubstr</title>
        <meta
          name="description"
          content="Login or Signup to your Zubstr account. Zubstr is an intstitute network application"
        />
      </Helmet>
      <div  className={currentTheme === "dark" ? "dark-bg App" : "App"}>
        {routes}
      </div>
    </ThemeProvider>
  );
};

export default App;
