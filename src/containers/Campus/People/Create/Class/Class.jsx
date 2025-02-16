import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Button,
  makeStyles,
  InputAdornment,
  IconButton,
  Paper,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Info, ChevronRight, X } from "react-feather";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../../../../../components/SearchInput/SearchInput";

import { createClass } from "../../../../../store/actions/campus";

const useStyles = makeStyles((theme) => ({
  tipsContainer: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "1rem",
    color: theme.palette.type === "dark" ? "#ccc" : "#555",
  },
  tipsList: {
    display: "flex",
    alignItems: "top",
    justifyContent: "top",
    marginBottom: ".5rem",
  },
}));

const ClassComp = (props) => {
  const [noNextClassChecked, setNoNextClass] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: { value: "", error: null },
    description: { value: "", error: null },
    location: { value: "", error: null },
    nextClassId: { value: "", error: null },
  });
  const initialForm = {
    name: { value: "", error: null },
    description: { value: "", error: null },
    location: { value: "", error: null },
    nextClassId: { value: "", error: null },
  };

  const resetForm = () => {
    setForm(initialForm);
  };

  const { name, description, location, nextClassId } = form;

  const handleNoNextChange = (event) => {
    setNoNextClass(event.target.checked);
  };
  const handleNextClassChange = (e, newVal) => {
    setForm((prev) => ({
      ...prev,
      nextClassId: { value: newVal.value, error: null },
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const data = {
        name: name.value,
        description: description.value,
        location: location.value,
        nextClassId: nextClassId.value,
      };
      dispatch(createClass(data))
        .then((res) => {
          setLoading(false);
          const { error, data } = res || {};
          if (data) {
            enqueueSnackbar("Class Create", {
              variant: "success",
            });
            resetForm();
          } else if (error) {
            if (error.msg) {
              enqueueSnackbar(error.msg, {
                variant: "error",
              });
            } else if (error.type === "validationError") {
              const { data: errData } = error || {};

              if (errData) {
                Array.isArray(data) &&
                  data.forEach((e) => {
                    setForm((prev) => ({
                      ...prev,
                      [e.param]: {
                        ...prev[e.param],
                        error: e.msg,
                      },
                    }));
                  });
              }
            } else {
              enqueueSnackbar("An error occurred, please try again later", {
                variant: "error",
              });
            }
          }
        })
        .catch((err) => {
          setLoading(false);
          enqueueSnackbar("An error occurred, please try again later", {
            variant: "error",
          });
        });
    }
  };

  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setForm((prev) => ({
      ...prev,
      [inputName]: {
        error: null,
        value: inputValue,
      },
    }));
  };

  const validate = () => {
    let valid = true;
    if (!name.value || name.value === "") {
      valid = false;
      setForm((prev) => ({
        ...prev,
        name: { ...prev.name, error: "Please enter name" },
      }));
    }
    return valid;
  };

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item md={6} sm={12}>
        <Paper>
          <form onSubmit={handleSubmit}>
            <Box p={2}>
              <Box mb={1}>
                <TextField
                  label="Name"
                  error={!!name.error}
                  helperText={name.error}
                  value={name.value}
                  onChange={handleInputChange}
                  disabled={loading}
                  variant="outlined"
                  placeholder="Class Name (Required)"
                  color="primary"
                  name="name"
                  fullWidth
                />
              </Box>
              <Box mb={1}>
                <TextField
                  error={!!description.error}
                  helperText={description.error}
                  value={description.value}
                  onChange={handleInputChange}
                  disabled={loading}
                  label="Description"
                  variant="outlined"
                  placeholder="Some description about the class  (Optional)"
                  color="primary"
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                />
              </Box>
              <Box mb={1}>
                <TextField
                  error={!!location.error}
                  helperText={location.error}
                  value={location.value}
                  onChange={handleInputChange}
                  disabled={loading}
                  label="Location"
                  variant="outlined"
                  placeholder="eg: First floor, Room no 2 (Optional)"
                  color="primary"
                  fullWidth
                  name="location"
                />
              </Box>
              <Box mb={1}>
                <SearchInput
                  searchType="class"
                  onChange={handleNextClassChange}
                  disabled={noNextClassChecked}
                  label="Next Class"
                  placeholder="Type and press search..."
                  noOptionsText="No class found"
                />
                <Box
                  mt={0.5}
                  mb={0}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Tooltip
                    title="After passing final exams, students of this class will be promoted to specified next class"
                    aria-label="add"
                    arrow
                  >
                    <Typography
                      variant="caption"
                      style={{ display: "flex", alignItems: "center" }}
                      color="textSecondary"
                    >
                      What is Next Class?
                      <Info size={15} style={{ marginLeft: "5px" }} />
                    </Typography>
                  </Tooltip>
                </Box>

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={noNextClassChecked}
                      onChange={handleNoNextChange}
                      name="noNextClassCheck"
                      color="primary"
                    />
                  }
                  label="There is no next class for this class"
                />
              </Box>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                type="submit"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress color="primary" size={20} />
                  ) : null
                }
              >
                Create Class
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
      <Grid item md={6} sm={12}>
        <Box className={classes.tipsContainer} mx={2} p={2}>
          <Typography variant="h5">Tips:</Typography>
          <Box mt={1}>
            <Box className={classes.tipsList}>
              <Box mr={0.5}>
                <ChevronRight size={20} />
              </Box>
              <Typography variant="body1">
                Create higher order class first to assign next class easily. eg:
                create 10th class first then while creating 9th class you can
                choose 10th class as next class
              </Typography>
            </Box>
            <Box className={classes.tipsList}>
              <Box mr={0.5}>
                <ChevronRight size={20} />
              </Box>
              <Typography variant="body1">
                Avoid adding class in the name. eg: use 'First' instead of
                'First Class'
              </Typography>
            </Box>
            <Box className={classes.tipsList}>
              <Box mr={0.5}>
                <ChevronRight size={20} />
              </Box>
              <Typography variant="body1">
                Avoid using numeric numbers. eg: use 'Second' instead of '2'
              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ClassComp;
