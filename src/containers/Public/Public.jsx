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
  Slide
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
  __RouterContext
} from "react-router-dom";
import EmailVerification from './EmailVerification/EmailVerification';
const Auth = props => {
  const isAuth = useSelector(state => state.auth.isAuth);
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);
  const success = useSelector(state => state.auth.success);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const p = useLocation().pathname;
  const redirect =
    p.indexOf("login") > -1 ||
    p.indexOf("signup") > -1 ||
    p.indexOf("verify-email") > -1 ? null : (
      <Redirect to="/auth/login" />
    );

  const { location } = useContext(__RouterContext);


  return (
    <div>
      {redirect}
      <Switch>
          <Route path="/public/verify-email/:token" component={EmailVerification} />
      </Switch>
    </div>
  );
};

export default Auth;
