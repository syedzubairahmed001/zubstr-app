import React, { useContext, useState } from "react";
import Helmet from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from "@material-ui/core";
import { Eye, EyeOff } from "react-feather";
import { Redirect, Link, __RouterContext } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { isEmail } from "../../../helpers/validator";

import Box from "@material-ui/core/Box";
import { signup } from "../../../store/actions/auth"; //TODO export all actions from one file

const Signup = props => {
  const [form, setForm] = useState({
    name: { value: "", error: false },
    email: { value: "", error: false },
    phone: { value: "", error: false },
    password: { value: "", error: false }
  });
  const [error, setError] = useState(false);
  const [isShowPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const toggleShowPassword = () => setShowPassword(prev => !prev);
  const [toggle, set] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const formTransitions = useTransition(toggle, null, {
    from: {
      opacity: 0,
      transform: "translate(-20%,0)"
    },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(20%,0)" }
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
    const { email, password, name, phone } = form;
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
    if (!name.value || name.value === "") {
      flag = false;
      setForm(prevForm => {
        return {
          ...prevForm,
          name: {
            ...prevForm.name,
            error: "Please enter name"
          }
        };
      });
    }
    if (!phone.value || phone.value === "") {
      flag = false;
      setForm(prevForm => {
        return {
          ...prevForm,
          phone: {
            ...prevForm.phone,
            error: "Please enter phone number"
          }
        };
      });
    }
    return flag;
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password, name, phone } = form;
    if (validate()) {
      const data = {
        email: email.value,
        password: password.value,
        name: name.value,
        phone: phone.value
      };
      dispatch(signup(data))
        .then(res => {
          if (res.account) {
            return setRedirect("/auth/login");
          } else if (res && res.error) {
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
          console.log(err);
        });
    }
  };
  const { email, password, name, phone } = form;
  return (
    <>
      <Helmet>
        <title>Zubstr Signup</title>
        <meta
          name="description"
          content="create account on Zubstr. Zubstr is an institute network application for owners or who runs educational institutions. Zubstr specifically designed for schools, colleges or universities to establish strong communication between students, teachers and management"
        />
      </Helmet>
      {redirect && <Redirect to={redirect} />}
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
                <Typography variant="h2" style={{ fontSize: "1rem" }}>
                  Zubstr is an institute network application which make you more
                  closer to your students and teachers
                </Typography>
              </Box>
              <Grid item className="w-100">
                <Box m={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Name"
                    id="name"
                    disabled={isLoading}
                    name="name"
                    helperText={name.error || null}
                    onChange={handleChange}
                    error={!!name.error}
                    value={name.value}
                  />
                </Box>
              </Grid>
              <Grid item className="w-100">
                <Box m={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    id="email"
                    type="email"
                    disabled={isLoading}
                    name="email"
                    helperText={email.error || null}
                    onChange={handleChange}
                    error={!!email.error}
                    value={email.value}
                  />
                </Box>
              </Grid>
              <Grid item className="w-100">
                <Box m={1}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Phone"
                    id="phone"
                    disabled={isLoading}
                    name="phone"
                    helperText={phone.error || null}
                    onChange={handleChange}
                    error={!!phone.error}
                    value={phone.value}
                  />
                </Box>
              </Grid>
              <Grid item className="w-100">
                <Box m={1}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel htmlFor="password" error={!!password.error}>
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
                  <Typography style={{ fontSize: ".7rem" }}>
                    Forgot password?
                  </Typography>{" "}
                  {/* TODO: forget password api logic */}
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
                    Create account
                  </Button>
                </Box>
              </Grid>
              <Grid item>
                <Box>
                  <Typography color="textSecondary">
                    Already a member?{" "}
                    <Link to="/auth/login" className="text-decoration-none">
                      <Button
                        type="submit"
                        variant="text"
                        color="primary"
                        disableElevation
                        size="small"
                      >
                        Login
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

export default Signup;
