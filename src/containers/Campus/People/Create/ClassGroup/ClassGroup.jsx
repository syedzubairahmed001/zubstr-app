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
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Info } from "react-feather";

const ClassGroup = (props) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [noNextClassChecked, setNoNextClass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingNextClass, setLoadingNextClass] = useState(false);
  const handleNoNextChange = (event) => {
    setNoNextClass(event.target.checked);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Grid container justify="center" spacing={2}>
      <Grid item md={6} sm={12}>
        <form onSubmit={handleSubmit}>
          <Box>
            <Box mb={1}>
              <TextField
                label="Name"
                variant="outlined"
                placeholder="Class Group Name (Required)"
                color="primary"
                fullWidth
              />
            </Box>
            <Box mb={1}>
              <TextField
                label="Description"
                variant="outlined"
                placeholder="Some description about the class group (Optional)"
                color="primary"
                fullWidth
                multiline
                rows={4}
              />
            </Box>
            <Box mb={1}>
              <Box
                mt={2}
                mb={0.5}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Tooltip
                  title="After passing final exams, students of this class will be promoted into specified next class"
                  aria-label="add"
                  arrow
                >
                  <Typography
                    variant="caption"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    What is Next Class?
                    <Info size={15} style={{ marginLeft: "5px" }} />
                  </Typography>
                </Tooltip>
              </Box>
              <Autocomplete
                id="asynchronous-demo"
                disabled={noNextClassChecked}
                fullWidth
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                getOptionSelected={(option, value) =>
                  option.name === value.name
                }
                getOptionLabel={(option) => option.name}
                options={options}
                noOptionsText="No class found"
                loading={loadingNextClass}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Next Class"
                    variant="outlined"
                    fullWidth
                    placeholder="Next Class (Required)"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loadingNextClass ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />

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
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress color="primary" size={20} />
                ) : null
              }
            >
              Create Class Group
            </Button>
          </Box>
        </form>
      </Grid>
      <Grid item md={6} sm={12}></Grid>
    </Grid>
  );
};

export default ClassGroup;
