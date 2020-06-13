import React, { useState } from "react";
import { Grid, Box, Typography, makeStyles, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Illustration from "../../../../../components/Illustration/Illustration";

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: "center",
  },
  illustration: {
    display: "inline-block",
    width: "10rem",
    height: "10rem",
  },
  para: {
    maxWidth: "60%",
    display: "inline-block",
  },
  "@media only screen and (max-width: 600px)": {
    container: {
      width: "95%",
    },
    para: {
      maxWidth: "100%",
    },
  },
}));

const EmptyCampus = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box className={classes.illustration} mb={2}>
        <Illustration type="campus" withBg />
      </Box>
      <Typography variant="h5" color="textPrimary">
        Create Campus
      </Typography>
      <Typography
        variant="body1"
        color="textSecondary"
        className={classes.para}
      >
        After creating the campus, you will be able to add students and
        teachers. You can create as many campuses as you want (school, college
        or other)
      </Typography>
      {/* TODO: add subscription check  */}
      <Box mt={2}>
        {/* TODO: add youtube tutorial */}
        {/* <Button variant="text" color="primary" disableElevation>
          Watch the tutorial
        </Button> */}
        <Link to="/i/campuses/campus" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" disableElevation>
            Create Campus
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default EmptyCampus;
