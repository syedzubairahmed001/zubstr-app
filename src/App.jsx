import React, { Component, lazy, Suspense } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import {
  LinearProgress
} from "@material-ui/core";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import theme from "./theme/theme-light";
import { authCheckState } from "./store/actions/auth";
import Auth from "./containers/Auth/Auth";
import Public from './containers/Public/Public';
import Dashboard from "./containers/Dashboard/Dashboard";
import Settings from "./containers/Settings/Settings";

const College = lazy(() => import("./containers/College/College"));

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {
    let routes = !this.props.isAuth ? (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/public" component={Public} />
        <Redirect to="/auth/login" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/settings" component={Settings} />
        <Redirect to="/dashboard" />
      </Switch>
    );
    return (
      <ThemeProvider theme={theme}>
        <div className="App">{routes}</div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = {
  authCheckState
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
