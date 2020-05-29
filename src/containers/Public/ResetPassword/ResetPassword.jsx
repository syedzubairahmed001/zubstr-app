import React, { useState } from "react";
import {
  Box,
  makeStyles,
  CircularProgress,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useParams, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";

import { resetPassword } from "../../../store/actions/user";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  formControl: {
    width: "40%",
  },
  "@media only screen and (max-width:600px)": {
    formControl: {
      width: "95%",
    },
  },
}));

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    newPassword: { value: "", error: null },
    confirmPassword: { value: "", error: null },
  });
  const { newPassword, confirmPassword } = form;
  const styles = useStyles();
  const { token } = useParams();

  const handleSubmit = () => {
    if (!newPassword.value) {
      setForm((prev) => ({
        ...prev,
        newPassword: {
          ...prev.newPassword,
          error: "Password cannot be blank",
        },
      }));
      return;
    } else if (newPassword.value !== confirmPassword.value) {
      setForm((prev) => ({
        ...prev,
        confirmPassword: {
          ...prev.confirmPassword,
          error: "Passwords do not match",
        },
      }));
      return;
    }
    setLoading(true);
    dispatch(
      resetPassword({
        token,
        newPassword: newPassword.value,
        confirmPassword: confirmPassword.value,
      })
    )
      .then((res) => {
        setLoading(false);
        if (res.success) {
          enqueueSnackbar("Your password has been changed", {
            variant: "success",
          });
          setRedirect("/auth/login");
        } else if (res.error && res.error.msg) {
          enqueueSnackbar(res.error.msg, {
            variant: "error",
          });
          setRedirect("/auth/login");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [name]: { ...prev[name], value, error: null },
    }));
  };

  return (
    <Box className={styles.container}>
      {redirect && <Redirect to={redirect} />}
      <Box mb={1}>
        <Typography variant="h5" color="textPrimary">
          Reset Password
        </Typography>
      </Box>
      <Box mb={1} className={styles.formControl}>
        <TextField
          label="New Password"
          value={newPassword.value}
          error={!!newPassword.error}
          helperText={newPassword.error}
          variant="outlined"
          fullWidth
          color="primary"
          name="newPassword"
          disabled={loading}
          type="password"
          onChange={handleChange}
        />
      </Box>
      <Box mb={1} className={styles.formControl}>
        <TextField
          label="Confirm Password"
          value={confirmPassword.value}
          error={!!confirmPassword.error}
          helperText={confirmPassword.error}
          variant="outlined"
          disabled={loading}
          fullWidth
          color="primary"
          name="confirmPassword"
          type="password"
          onChange={handleChange}
        />
      </Box>
      <Box>
        <Button
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          disableElevation
          startIcon={
            loading ? (
              <CircularProgress
                color="primary"
                style={{ width: "20px", height: "20px" }}
              />
            ) : null
          }
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
};

export default ResetPassword;
