import React, { Component } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";
import theme from "./theme/theme";
import {authCheckState} from './store/actions/auth'
import Login from "./containers/Login/Login";
import Dashboard from './containers/Dashboard/Dashboard';
import Settings from './containers/Settings/Settings';

class App extends Component {
  componentDidMount() {
    this.props.authCheckState();
  }
  render() {
    let routes = !this.props.isAuth ? (
      <Switch>
        <Route path="/login" component={Login} />
        <Redirect to="/login" />
      </Switch>
    ) : (
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/settings" component={Settings} />
        <Redirect to="/dashboard" />
      </Switch>
    );
    return <ThemeProvider theme={theme}>{routes}</ThemeProvider>;
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
});

const mapDispatchToProps = {
  authCheckState
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
