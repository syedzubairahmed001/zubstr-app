import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Typography } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";
import { useTransition, animated } from "react-spring";

import Box from "@material-ui/core/Box";
import { signup } from "../../../store/actions/auth"; 

const Signup = props => {
  let timeStamp;

  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(null);
  const [counter, setCounter] = useState(30);
  const [isTimerOn, setTimerOn] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.auth.isLoading);

  const formTransitions = useTransition(false, null, {
    from: {
      opacity: 0,
      transform: "translate(-20%,0)"
    },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(20%,0)" }
  });

  const handleResendEmail = e => {
    e.preventDefault();
    resetTimer();
    setTimerOn(true);
    setTimer(
      setInterval(() => {
        if (counter <= 0) {
          resetTimer();
        } else {
          decCounter();
        }
      }, 1000)
    );
  };
  const decCounter = () => {
    setTimerOn(true);
    setCounter(prev => (prev <= 0 ? prev : prev - 1));
  };
  const resetTimer = () => {
    timer && clearInterval(timer);
    setCounter(30);
    setTimer(null);
    setTimerOn(false);
  };
  useEffect(() => {
    counter === 0 && timer && resetTimer();
  });
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {formTransitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="space-around"
            spacing={1}
          >
            <Grid item >
              <Typography align="center">
                A verification email is sent, please follow the steps in it to
                continue using Zubstr
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" align="center">
                Didn't recevie email?
              </Typography>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Button
                    onClick={handleResendEmail}
                    variant="contained"
                    disabled={isTimerOn}
                    disableElevation
                    color="primary"
                  >
                    Resend Email
                  </Button>
                </Grid>
                <Grid item>
                  <Typography>{`00:${counter}`}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </animated.div>
      ))}
    </>
  );
};

export default Signup;
