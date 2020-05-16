import React from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";

import Requests from "../Requests/Requests";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
  },
  usersContainer: {
    flex: 2,
  },
  requestContainer: {
    flex: 1,
  },
}));

const Students = (props) => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.usersContainer}>
          <Grid container>
            <Grid item md={4}>
              hello
            </Grid>
            <Grid item md={4}>
              world
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.requestContainer}>
          <Requests />
        </Box>
      </Box>
    </>
  );
};

export default Students;
