import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { TextField, Button, Tooltip } from "@material-ui/core";
import {Redirect} from 'react-router-dom';

import Box from "@material-ui/core/Box";
import classes from "./Login.module.scss";
import { login } from "../../store/actions/auth"; //TODO export all actions from one file

class Login extends Component {
  state = {
    email: "",
    password: ""
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    this.props.login(email, password);
  };

  render() {
    let redirect = this.props.isAuth ? <Redirect to="/dashboard" /> : null;
    return (
      <div className={classes.loginContainer}>
        {redirect}
        <div className={classes.loginFormContainer}>
          <form noValidate onSubmit={this.handleSubmit}>
            <h2>Zubstr Login</h2>
            <Box mb={2}>
              <TextField
                label="email"
                variant="outlined"
                fullWidth
                value={this.state.email}
                onChange={(e) => this.setState({email: e.target.value})}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                //   error="false"
                value={this.state.password}
                onChange={(e) => this.setState({password: e.target.value})}
                helperText={
                  <Tooltip
                    title="We need this to secure your account, no one accept you can access this"
                    arrow
                  >
                    <span style={{ margin: "0" }}>Why this is required?</span>
                  </Tooltip>
                }
                label="password"
                variant="outlined"
                inputProps={{ type: "password" }}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
              size="large"
            >
              Login
            </Button>
          </form>
        </div>
        <div className={classes.loginBgContainer}></div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.isAuth
})
const mapDispatchToProps = {
  login
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
