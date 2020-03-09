import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import { verifyEmail } from "../../../store/actions/auth";
import { Typography, Button, Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { token } = useParams();
  console.log(token, isLoading);
  useEffect(() => {
    if (!token) {
      return setRedirect("/auth/login");
    } else {
      dispatch(verifyEmail({ token }))
        .then(res => {
          setLoading(false);
          if (res.error) {
            return setRedirect("/auth/login");
          }
          setSuccess(true);
        })
        .catch(err => setRedirect("/auth/login"));
    }
  }, [dispatch, token]);

  return (
    <>
      {redirect && <Redirect to={redirect} />}
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        spacing={2}
      >
        {success && !isLoading && (
          <>
            <Grid item>
              <Typography variant="h4" align="center" color="textSecondary">
                Wohoo! Your email is verified
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => setRedirect("/auth/login")}
              >
                Continue to Zubstr
              </Button>
            </Grid>
          </>
        )}
        {!success && isLoading && (
          <>
            <Skeleton variant="rect" width={100} height={30} />
            <Skeleton variant="rect" width={100} height={30} />
          </>
        )}
      </Grid>
    </>
  );
};

export default EmailVerification;
