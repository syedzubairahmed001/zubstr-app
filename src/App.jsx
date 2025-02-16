import React, { lazy, Suspense, useState, useEffect, useContext } from "react";
import Helmet from "react-helmet";
import { useTransition, animated } from "react-spring";
import { ThemeProvider } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core";
import {
  Route,
  Switch,
  Redirect,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SnackbarProvider, useSnackbar } from "notistack";

import "./App.css";
import lightTheme from "./theme/theme-light";
import darkTheme from "./theme/theme-dark";
import { authCheckState, getAccount } from "./store/actions/auth";
import Auth from "./containers/Auth/Auth";
import Public from "./containers/Public/Public";
import AppLoading from "./components/AppLoading/AppLoading";
import PostModal from "./components/PostModal/PostModal";

const Campus = lazy(() => import("./containers/Campus/Campus"));
const InstituteGroup = lazy(() =>
  import("./containers/InstituteGroup/InstituteGroup")
);
const User = lazy(() => import("./containers/User/User"));

const lazyLoad = (Component) => {
  return (props) => (
    <Suspense fallback={<AppLoading />}>
      <Component {...props} />
    </Suspense>
  );
};

const useStyles = makeStyles((theme) => ({
  successSnackbar: {
    backgroundColor: theme.palette.success.main,
  },
  errorSnackbar: {
    backgroundColor: "blue",
  },
}));
const App = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isGlobalLoading = useSelector((state) => state.global.isLoading);
  const currentTheme = useSelector((state) => state.global.theme);
  const user = useSelector((state) => state.auth.user) || null;
  const account = useSelector((state) => state.auth.account) || null;
  const match = useLocation();
  let pathRedirect = match.pathname || null;
  const authRedirect = useSelector((state) => state.auth.redirect);
  const { accounts } = user || {};
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authCheckState({ redirect: pathRedirect }));
  }, []);
  let routes;
  const commonRoutes = <Route path="/public" component={Public} />;

  if (isGlobalLoading) {
    routes = <AppLoading />;
  } else if (!isAuth) {
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
              <PostModal />
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
                  <Redirect to="/c/dashboard" />
                )}
              </Switch>
              <PostModal />
            </>
          );
          break;
        default:
          routes = <div></div>;
      }
    } else {
      let a;
      const lastUsedAccountId = localStorage.getItem("current-acc-id") || null;
      const lastUsedAccountType =
        localStorage.getItem("current-acc-type") || null;
      if (lastUsedAccountId && lastUsedAccountType) {
        dispatch(
          getAccount({
            account: { accType: lastUsedAccountType, id: lastUsedAccountId },
          })
        )
          .then((res) => {})
          .catch((err) => {
            routes = <div></div>;
          });
      } else {
        a =
          Array.isArray(accounts) &&
          accounts.find(
            (e) =>
              e.accType.toLowerCase() === "institutegroup" ||
              e.accType.toLowerCase() === "campus"
          );

        if (a) {
          const { accType, id } = a;
          dispatch(getAccount({ account: { accType, id } }))
            .then((res) => {})
            .catch((err) => {
              routes = <div></div>;
            });
        } else {
          routes = <div></div>;
        }
      }
    }
  }

  const theme = currentTheme === "dark" ? darkTheme : lightTheme;
  const classes = useStyles();
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
      <SnackbarProvider
        maxSnack={1}
        preventDuplicate
        classes={{
          variantSuccess: classes.successSnackbar,
          variantError: classes.errorSnackbar,

          // variantWarning: classes.warning,
          // variantInfo: classes.info,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className={currentTheme === "dark" ? "dark-bg App" : "App"}>
          {routes}

          <InternetConnectionAlerter />
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

const InternetConnectionAlerter = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleConnectionChange = (event) => {
    if (event.type === "offline") {
      enqueueSnackbar(
        "Oops!, you are offline, please check your internet connection",
        {
          variant: "error",
        }
      );
    }
    if (event.type === "online") {
      enqueueSnackbar("Yay! you are back online.", {
        variant: "success",
      });
    }

    console.log(new Date(event.timeStamp));
  };
  window.addEventListener("online", handleConnectionChange);
  window.addEventListener("offline", handleConnectionChange);
  return <></>;
};

export default App;
