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
} from "react-router-dom";
import EmailVerification from "./EmailVerification/EmailVerification";
import ResetPassword from "./ResetPassword/ResetPassword";
const Auth = (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);
  const success = useSelector((state) => state.auth.success);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const { location } = useContext(__RouterContext);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Switch>
        <Route
          path="/public/verify-email/:token"
          component={EmailVerification}
        />
        <Route
          path="/public/reset-password/:token"
          component={ResetPassword}
        />
        <Redirect to="/auth/login" />
      </Switch>
    </div>
  );
};

export default Auth;
