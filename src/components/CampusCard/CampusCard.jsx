import React, { Fragment } from "react";
import {
  Chip,
  Paper,
  Typography,
  Box,
  Grid,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ExternalLink } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
// import classes from "./CampusCard.module.scss";
import { Skeleton } from "@material-ui/lab";

import { getAccount } from "../../store/actions/auth";

const useStyles = makeStyles((theme) => ({
  addBtn: {
    color: theme.palette.text.secondary,
    transition: ".2s",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gridContainer: {
    minHeight: "12rem",
    textDecoration: "none",
  },
  schoolChip: {
    backgroundColor: "#f7b731",
  },
  collegeChip: {
    backgroundColor: "#e67e22",
  },
  otherChip: {
    backgroundColor: "#2c3e50",
  },
  box: {
    height: "100%",
  },
}));
const CardLink = (props) => {
  const { to, children } = props;

  return to ? (
    <Link {...props} style={{ textDecoration: "none" }}>
      {children}
    </Link>
  ) : (
    <Fragment>{children}</Fragment>
  );
};

const CampusCard = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { name, location, principal, type, isAdd, skeleton, link, campusId } =
    props || {};
  let chipClassname = classes.otherChip;
  switch (type) {
    case "school":
      chipClassname = classes.schoolChip;
      break;
    case "college":
      chipClassname = classes.collegeChip;
      break;
    default:
      break;
  }
  let card, typeChip;
  const swicthAccount = () => {
    const accountData = { id: campusId, accType: "campus" };

    dispatch(getAccount({ account: accountData }));
  };
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
        <Paper elevation={0} className={classes.addBtn} variant="outlined">
          <Box p={2} className={classes.box}>
            <Grid
              container
              direction="column"
              spacing={1}
              justify="center"
              alignItems="center"
              className={classes.gridContainer}
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
      <Paper elevation={0} variant="outlined">
        <Box p={2} className={classes.box}>
          <Grid
            container
            direction="column"
            spacing={1}
            justify="space-between"
            className={classes.gridContainer}
          >
            <Grid item>
              <Typography variant="h5" style={{ fontSize: "1.3rem" }}>
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Box className={classes.cardFooter}>
                <Chip
                  color="primary"
                  title="campus type"
                  label={type && type.toLowerCase()}
                  className={chipClassname}
                />
                <IconButton
                  color="inherit"
                  aria-label="menu"
                  title={"login as " + name}
                  onClick={() => swicthAccount()}
                >
                  <ExternalLink strokeWidth={1.5} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </CardLink>
  );
};

export default CampusCard;
