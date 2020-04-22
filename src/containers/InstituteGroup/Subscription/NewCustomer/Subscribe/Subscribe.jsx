import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  Fab,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Lock } from "react-feather";
import { useSnackbar } from "notistack";

import { createSubscription } from "../../../../../store/actions/instituteGroup";
import { setIsTrial } from "../../../../../store/actions/auth";
import { setIsSubNow } from "../../../../../store/actions/instituteGroup";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const Subscribe = () => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const theme = useSelector((state) => state.global.theme);
  const user = useSelector((state) => state.auth.user);
  const { enqueueSnackbar } = useSnackbar();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: theme === "dark" ? "#ddd" : "#333",
        fontFamily: '"Roboto", sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: theme === "dark" ? "#aaa" : "#ccc",
        },
      },
      invalid: {
        color: "#e74c3c",
        iconColor: "#e74c3c",
      },
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      enqueueSnackbar("Secure payment is loading, Please wait...", {
        variant: "info",
      });
      return;
    }
    setError(null);
    setLoading(true);

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: user.email,
      },
    });

    stripePaymentMethodHandler(result);
  };
  const stripePaymentMethodHandler = (result, email) => {
    console.log(result);
    if (result.error) {
      setLoading(false);
      setError(result.error.message);
    } else {
      dispatch(
        createSubscription({
          subscriptionData: { paymentMethod: result.paymentMethod.id },
        })
      )
        .then((res) => {
          setLoading(false);
          const { subscription } = res || {};
          const { latest_invoice } = subscription || {};
          const { payment_intent } = latest_invoice || {};

          if (payment_intent) {
            const { client_secret, status } = payment_intent;

            if (status === "requires_action") {
              stripe.confirmCardPayment(client_secret).then(function (result) {
                if (result.error) {
                  setError(result.error.message);
                } else {
                  dispatch(setIsSubNow(true));
                }
              });
            } else {
              dispatch(setIsSubNow(true));
            }
          }
          dispatch(setIsSubNow(true));
        })
        .catch((err) => {
          enqueueSnackbar(
            "Something went wrong, if you are seeing this issue frequently please contact us hello@zubstr.com",
            { variant: "error" }
          );
          setLoading(false);
        });
    }
  };
  return (
    <Box p={3}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item md={6} xs={12} style={{ textAlign: "center" }}>
            <Box p={2}>
              <Typography variant="h5">Subscribe</Typography>
              <Typography variant="body2" color="textSecondary">
                Enter your credit or debit card details to subscribe
              </Typography>
              <Typography variant="body2" color="textSecondary">
                You can cancel your Subscription any time you want
              </Typography>
            </Box>
            <Paper elevation={0} variant="outlined" style={{ width: "100%" }}>
              <Box p={2}>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
              </Box>
            </Paper>
            {error && (
              <Typography
                color="error"
                align="left"
                style={{
                  animation: "input-helperText-animate .1s ease-out  1 both",
                }}
              >
                {error}
              </Typography>
            )}
            <Box mt={1}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                className={classes.button}
                type="submit"
                disabled={isLoading}
                startIcon={
                  isLoading ? (
                    <CircularProgress
                      color="primary"
                      style={{ width: "20px", height: "20px" }}
                    />
                  ) : (
                    <Lock size={15} />
                  )
                }
              >
                Pay Securely
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Subscribe;
