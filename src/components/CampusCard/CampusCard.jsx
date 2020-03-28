import React, { Fragment } from "react";
import {
  Chip,
  Paper,
  Typography,
  Box,
  Grid,
  makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";

import classes from "./CampusCard.module.scss";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  addBtn: {
      color: theme.palette.text.secondary,
      transition: '.2s',
      "&:hover": {
      color: theme.palette.primary.main
    }
  },
  gridContainer: {
    minHeight: "12rem",
    textDecoration: "none"
  },
  schoolChip: {
    backgroundColor: "#f7b731"
  },
  box: {
    height: "100%"
  }
}));
const CardLink = props => {
  const { to, children } = props;

  return to ? (
    <Link {...props} style={{ textDecoration: "none" }}>
      {children}
    </Link>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

const CampusCard = props => {
  const styles = useStyles();
  const { name, location, principal, type, isAdd, skeleton, link } =
    props || {};

  let card, typeChip;
  if (skeleton) {
    return (
      <Skeleton
        variant="rect"
        style={{ width: "100%", minHeight: "13.5rem", borderRadius: "10px" }}
        animation="wave"
      />
    );
  }
  if (isAdd) {
    return (
      <CardLink to={link}>
        <Paper
          elevation={0}
          className={styles.addBtn}
          variant="outlined"
        >
          <Box p={2} className={styles.box}>
            <Grid
              container
              direction="column"
              spacing={1}
              justify="center"
              alignItems="center"
              className={styles.gridContainer}
            >
              <Grid item>
                <Typography
                  variant="h2"
                  color="inherit"
                  style={{ fontWeight: 300 }}
                >
                  +
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </CardLink>
    );
  }
  return (
    <CardLink to={link}>
      <Paper
        elevation={0}
          variant="outlined"
      >
        <Box p={2} className={styles.box}>
          <Grid
            container
            direction="column"
            spacing={1}
            justify="space-between"
            className={styles.gridContainer}
          >
            <Grid item>
              <Typography variant="h5" style={{ fontSize: "1.3rem" }}>
                Mukhaffam jah college of Engeenering and Technology
              </Typography>
            </Grid>
            <Grid item>
              <Chip
                color="primary"
                title="school"
                label="school"
                className={styles.schoolChip}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </CardLink>
  );
};

export default CampusCard;
