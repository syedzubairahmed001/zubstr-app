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
  CircularProgress
} from "@material-ui/core";
import { Lock } from "react-feather";

import { createSubscription } from "../../../../store/actions/admin";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#333",
      fontFamily: '"Roboto", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#ccc"
      }
    },
    invalid: {
      color: "#e74c3c",
      iconColor: "#e74c3c"
    }
  }
};
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));
const Subscribe = () => {
  const classes = useStyles();
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: "jenny.rosen@example.com"
      }
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
          subscriptionData: { paymentMethod: result.paymentMethod.id }
        })
      )
        .then(res => {
          setLoading(false);
          const { subscription } = res || {};
          const { latest_invoice } = subscription || {};
          const { payment_intent } = latest_invoice || {};

          if (payment_intent) {
            const { client_secret, status } = payment_intent;

            if (status === "requires_action") {
              stripe.confirmCardPayment(client_secret).then(function(result) {
                if (result.error) {
                  setError(result.error.message);
                } else {
                  setSuccess("helloworld");
                }
              });
            } else {
              console.log("success");
            }
          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
      // Otherwise send paymentMethod.id to your server
      // fetch('/create-customer', {
      //   method: 'post',
      //   headers: {'Content-Type': 'application/json'},
      //   body: JSON.stringify({
      //     email: 'jenny.rosen@example.com',
      //     payment_method: result.paymentMethod.id
      //   }),
      // }).then(function(result) {
      //  return result.json();
      // }).then(function(customer) {
      //   // The customer has been created
      // });
    }
  };
  //TODO add shield icon with label 'subscribe securely'
  return (
    <Box p={3}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1} justify="center" alignItems="center">
          <Grid item md={6} xs={12} style={{ textAlign: "center" }}>
            <Box p={2}>
              <Typography variant="h5">Subscribe</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Enter your credit or debit card details to subscribe
              </Typography>
              <Typography color="textSecondary">
                You can cancel your Subscription any time you want
              </Typography>
            </Box>
            <Paper elevation={0} variant="outlined" style={{ width: "100%" }}>
              <Box p={2}>
                <CardElement options={CARD_ELEMENT_OPTIONS} />
              </Box>
            </Paper>
            {error && (
              <Typography color="error" align="left">
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
                Proceed Securely
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Subscribe;
