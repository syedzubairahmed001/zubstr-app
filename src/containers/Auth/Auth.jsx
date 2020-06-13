import React, { Component, Fragment, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  Tooltip,
  Grid,
  Paper,
  Box,
  Typography,
  LinearProgress,
  Snackbar,
  Slide,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
  __RouterContext,
  Link,
} from "react-router-dom";
import { useTransition, animated } from "react-spring";

import Login from "./Login/Login";
import SignUp from "./Signup/Signup";
import VerifyEmail from "./VerifyEmail/VerifyEmail";
import PasswordReset from "./PasswordReset/PasswordReset";
import classes from "./auth.module.scss";
import { setAuthError, setAuthSuccess } from "../../store/actions/auth";
import Logo from "../../components/Logo/Logo";

const SlideTransition = (props) => {
  return <Slide {...props} direction="down" />;
};
const Auth = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.success);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const p = useLocation().pathname;

  let title;
  switch (p && p.split("/").reverse()[0]) {
    case "login":
      title = "Zubstr - Login";
      break;
    case "signup":
      title = "Zubstr - Signup";
      break;
    case "verify-email":
      title = "Verify Email";
      break;
    case "reset-password":
      title = "Reset Password";
      break;
    default:
      title = "Zubstr";
  }
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, (location) => location.pathname, {
    from: {
      opacity: 0,
      transform: "translate(100%,0)",
    },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" },
  });

  return (
    <div className={classes.authContainer}>
      {error && !success && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          TransitionComponent={SlideTransition}
          onClose={() => dispatch(setAuthError(null))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          TransitionComponent={SlideTransition}
          onClose={() => dispatch(setAuthSuccess(null))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      )}

      <Grid container alignItems="center" justify="center">
        <Grid item container md={6} sm={8} lg={4}>
          <Box px={2} className="w-100">
            <Paper elevation={1}>
              <Paper elevation={0} style={{ padding: "30px" }}>
                <Box>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Logo width="3rem" />
                    </Grid>
                    <Grid item>
                      <Box px={2}>
                        <Typography
                          variant="h1"
                          color="textSecondary"
                          style={{
                            textTransform: "capitalize",
                            fontSize: "2rem",
                            fontWeight: 400,
                          }}
                        >
                          {title}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
                <Box>
                  <Switch>
                    <Route path={`/auth/login`} component={Login} />
                    <Route path={`/auth/signup`} component={SignUp} />
                    <Route
                      path={`/auth/verify-email`}
                      component={VerifyEmail}
                    />
                    <Route
                      path={`/auth/reset-password`}
                      component={PasswordReset}
                    />
                    <Redirect to="/auth/login" />
                  </Switch>
                </Box>
                <Typography
                  color="textPrimary"
                  align="center"
                  style={{ padding: "10px" }}
                >
                  We are currently under development, please visit{" "}
                  <a
                    href="https://www.zubstr.com"
                    style={{ textDecoration: "none", color: "#0083FF" }}
                  >
                    this page
                  </a>
                </Typography>
              </Paper>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Auth;
