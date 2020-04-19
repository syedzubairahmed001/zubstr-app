import React, { Component, Fragment, useContext, useState } from "react";
import Helmet from 'react-helmet';
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Tooltip,
  Paper,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from "@material-ui/core";
import { Eye, EyeOff } from "react-feather";
import { Redirect, Link, __RouterContext } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { isEmail } from "../../../helpers/validator";

import Box from "@material-ui/core/Box";
import classes from "../auth.module.scss";
import { login, setAuthError} from "../../../store/actions/auth"; 

const Login = props => {
  const [form, setForm] = useState({
    email: { value: "", error: false },
    password: { value: "", error: false }
  });
  const [error, setError] = useState(false);
  const [isShowPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const [toggle, set] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const formTransitions = useTransition(toggle, null, {
    from: {
      opacity: 0,
      transform: "translate(20%,0)"
    },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-20%,0)" }
  });

  const handleChange = e => {
    const name = e.target.name,
      value = e.target.value;
    setForm(prevValue => ({
      ...prevValue,
      [name]: { value, error: false }
    }));
  };
  const validate = () => {
    const { email, password } = form;
    let flag = true;
    if (!email.value || email.value === "" || !isEmail(email.value)) {
      flag = false;
      setForm(prevForm => {
        return {
          ...prevForm,
          email: {
            ...prevForm.email,
            error: "Please enter a valid email"
          }
        };
      });
    }
    if (!password.value || password.value === "") {
      flag = false;
      setForm(prevForm => {
        return {
          ...prevForm,
          password: {
            ...prevForm.password,
            error: "Please enter password"
          }
        };
      });
    }

    return flag;
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = form;
    if (validate()) {
      const data = { email: email.value, password: password.value };
      dispatch(login(data))
        .then(res => {
          if (res && res.error) {
            if (res.error.type === "validationError") {
              const data = res.error.data;
              Array.isArray(data) &&
                data.forEach(e => {
                  setForm(prevValue => {
                    return {
                      ...prevValue,
                      [e.param]: {
                        value: prevValue[e.param].value,
                        error: e.msg
                      }
                    };
                  });
                });
            }
          }
        })
        .catch(err => {
          setError("Something is wrong, please try again");
        });
    }
  };
  const { email, password } = form;
  return (
    <>
    <Helmet>
        <title>Zubstr Login</title>
        <meta
          name="description"
          content="Login to your Zubstr account. Zubstr is an institute network application for principals or who runs educational institutions"
        />
      </Helmet>
      {formTransitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <form onSubmit={handleSubmit} className="w-100">
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="space-around"
            >
              <Box textAlign="center" m={1}>
              <Typography variant="h2" style={{fontSize: '1rem'}} >Welcome back! Login to your existing Zubstr account</Typography>
              </Box>
              <Grid item className="w-100">
                <Box m={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    id="email"
                    disabled={isLoading}
                    name="email"
                    type="email"
                    helperText={email.error || null}
                    onChange={handleChange}
                    error={!!email.error}
                    value={email.value}
                  />
                </Box>
              </Grid>
              <Grid item className="w-100">
                <Box m={1}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password" error={!!password.error} disabled={isLoading}>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      type={isShowPassword ? "text" : "password"}
                      value={password.value}
                      onChange={handleChange}
                      id="password"
                      error={!!password.error}
                      disabled={isLoading}
                      name="password"
                      labelWidth={70}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                            onMouseDown={e => e.preventDefault()}
                          >
                            {isShowPassword ? (
                              <Eye color="#aaa" />
                            ) : (
                              <EyeOff color="#aaa" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {password.error && (
                      <FormHelperText
                        error={!!password.error}
                        className="height-animate"
                      >
                        {password.error}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Typography style={{fontSize: '.7rem'}} >Forgot password?</Typography> {/* TODO: forget password api logic */}
                </Box>
              </Grid>
              <Grid item className="w-100"> 
                <Box m={1}>
                  <Button
                    type="submit"
                    size="large"
                    variant="contained"
                    disabled={isLoading}
                    fullWidth
                    color="primary"
                    disableElevation
                  >
                    Login
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  <Typography color="textSecondary" >
                    Don't have an account?{" "}
                    <Link to="/auth/signup" className="text-decoration-none">
                      <Button
                        type="submit"
                        variant="text"
                        color="primary"
                        disableElevation
                        size="small"
                      >
                        Signup
                      </Button>
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </animated.div>
      ))}
    </>
  );
};

export default Login;
