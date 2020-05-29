import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import { requestResetPasswordEmail } from "../../../../store/actions/user";

const SendReset = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
  };

  const handleSubmit = () => {
    if (
      !email ||
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setError("Please enter a valid email");
      return;
    }
    setLoading(true);
    dispatch(requestResetPasswordEmail({ email }))
      .then((res) => {
        setLoading(false);
        if (res.success) {
          enqueueSnackbar("Email is sent, please check your inbox", {
            variant: "success",
          });
          setEmail("");
        } else if (res.error && res.error.msg) {
          enqueueSnackbar(res.error.msg, {
            variant: "error",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Something went wrong, please try again", {
          variant: "error",
        });
      });
  };

  return (
    <Box>
      <Box mt={1}>
        <Typography align="center" variant="body1">
          Enter Email
        </Typography>
      </Box>
      <Box style={{ textAlign: "center" }}>
        <Typography align="center" variant="caption" color="textSecondary">
          We'll send a password reset link to your email
        </Typography>
      </Box>
      <Box mt={1}>
        <TextField
          label="Your Email"
          type="email"
          onChange={handleEmailChange}
          value={email}
          disabled={loading}
          variant="outlined"
          error={!!error}
          helperText={error || null}
          color="primary"
          fullWidth
        />
      </Box>
      <Box mt={1} style={{ textAlign: "center" }}>
        <Link to="/auth/login" style={{ textDecoration: "none" }}>
          <Button color="primary" variant="text" disableElevation>
            Back
          </Button>
        </Link>
        <Button
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleSubmit}
          disabled={loading}
          startIcon={
            loading ? (
              <CircularProgress
                color="primary"
                style={{ width: "20px", height: "20px" }}
              />
            ) : null
          }
        >
          Send Link
        </Button>
      </Box>
    </Box>
  );
};

export default SendReset;
