import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { verifyEmail } from "../../../store/actions/auth";
import { Typography, Button, Grid, makeStyles, Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import Lottie from "react-lottie";

import tickAnimation from "../../../assets/lottiefiles/tick.json";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    minHeight: "100vh",
    textAlign: "center",
  },
}));

const EmailVerification = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const classes = useStyles();
  const { token } = useParams();
  console.log(token, isLoading);
  useEffect(() => {
    if (!token) {
      return setRedirect("/auth/login");
    } else {
      dispatch(verifyEmail({ token }))
        .then((res) => {
          setLoading(false);
          if (res.error) {
            return setRedirect("/auth/login");
          }
          setSuccess(true);
        })
        .catch((err) => setRedirect("/auth/login"));
    }
  }, [dispatch, token]);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: tickAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        className={classes.container}
        spacing={2}
      >
        <>
          <Grid item>
            {!success && isLoading ? (
              <Skeleton
                variant="rect"
                animation="wave"
                width={100}
                height={100}
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <Lottie options={defaultOptions} height={100} width={100} />
            )}
          </Grid>
          <Grid item>
            {!success && isLoading ? (
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Skeleton
                  variant="rect"
                  animation="wave"
                  width={300}
                  height={20}
                  style={{ borderRadius: "10px", marginBottom: "10px" }}
                />
                <Skeleton
                  variant="rect"
                  animation="wave"
                  width={500}
                  height={10}
                  style={{ borderRadius: "10px" }}
                />
              </Box>
            ) : (
              <>
                <Typography variant="h4" align="center" color="textSecondary">
                  Wohoo! Your email is verified
                </Typography>
                <Typography
                  variant="body2"
                  align="center"
                  color="textSecondary"
                >
                  If you are a student or teacher please download Zubstr
                  App from play store or app store
                </Typography>
              </>
            )}
          </Grid>
          <Grid item>
            {!success && isLoading ? (
              <Skeleton
                variant="rect"
                animation="wave"
                width={120}
                height={50}
                style={{ borderRadius: "10px" }}
              />
            ) : (
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => setRedirect("/auth/login")}
              >
                Continue to Zubstr
              </Button>
            )}
          </Grid>
        </>
      </Grid>
    </>
  );
};

export default EmailVerification;
