import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
import Helmet from "react-helmet";
import { useTransition, animated } from "react-spring";
import { ThemeProvider } from "@material-ui/core/styles";
import { LinearProgress } from "@material-ui/core";
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
  useLocation
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./App.css";
import lightTheme from "./theme/theme-light";
import darkTheme from "./theme/theme-dark";
import { authCheckState, getAccount } from "./store/actions/auth";
import Auth from "./containers/Auth/Auth";
import Public from "./containers/Public/Public";
import AppLoading from "./components/AppLoading/AppLoading";

const Campus = lazy(() => import("./containers/Campus/Campus"));
const InstituteGroup = lazy(() =>
  import("./containers/InstituteGroup/InstituteGroup")
);
const User = lazy(() => import("./containers/User/User"));

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
  const account = useSelector(state => state.auth.account) || null;
  const match = useLocation();
  let pathRedirect = match.pathname || null;
  const authRedirect = useSelector(state => state.auth.redirect);
  const { accounts } = user || {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckState({ redirect: pathRedirect }));
  }, []);
  let routes;
  const commonRoutes = <Route path="/public" component={Public} />;
  if (isGlobalLoading) {
    console.log("loading...");
    routes = <AppLoading />;
  } else if (!isAuth) {
    console.log("iam at auth login...");
    routes = (
      <>
        <Switch>
          <Route path="/auth" component={Auth} />
          {commonRoutes}
          <Redirect to="/auth/login" />
        </Switch>
      </>
    );
  } else if (!accounts || accounts.length === 0) {
    routes = (
      <>
        <Switch>
          <Route path="/u" component={lazyLoad(User)} />
          {commonRoutes}
          {authRedirect && authRedirect.indexOf("/u/") > -1 ? (
            <Redirect to={authRedirect} />
          ) : (
            <Redirect to="/u" />
          )}
        </Switch>
      </>
    );
  } else {
    if (account) {
      switch (account.accType) {
        case "institutegroup":
          routes = (
            <>
              <Switch>
                <Route path="/i" component={lazyLoad(InstituteGroup)} />
                <Route path="/public" component={Public} />
                {authRedirect && authRedirect.indexOf("/i/") > -1 ? (
                  <Redirect to={authRedirect} />
                ) : (
                  <Redirect to="/i/dashboard" />
                )}
              </Switch>
            </>
          );
          break;
        case "campus":
          routes = (
            <>
              <Switch>
                <Route path="/c" component={lazyLoad(Campus)} />
                <Route path="/public" component={Public} />
                {authRedirect && authRedirect.indexOf("/c/") > -1 ? (
                  <Redirect to={authRedirect} />
                ) : (
                  <Redirect to="/i/dashboard" />
                )}
              </Switch>
            </>
          );
          break;
        default:
          routes = <div></div>;
      }
    } else {
      let a;
      a =
        Array.isArray(accounts) &&
        accounts.find(
          e =>
            e.accType.toLowerCase() === "institutegroup" ||
            e.accType.toLowerCase() === "campus"
        );

      if (a) {
        const { accType, id } = a;
        dispatch(getAccount({ account: { accType, id } }))
          .then(res => {})
          .catch(err => {
            routes = <div></div>;
          });
      } else {
        routes = <div></div>;
      }
    }
  }
  const theme = currentTheme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      {currentTheme === "dark"
        ? document.querySelector("body").classList.add("dark-bg")
        : document.querySelector("body").classList.remove("dark-bg")}
      <Helmet>
        <title>Zubstr</title>
        <meta
          name="description"
          content="Login or Signup to your Zubstr account. Zubstr is an intstitute network application"
        />
      </Helmet>
      <div className={currentTheme === "dark" ? "dark-bg App" : "App"}>
        {routes}
      </div>
    </ThemeProvider>
  );
};

export default App;
