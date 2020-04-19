import React, { Component, useState } from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { Camera, Bell, Sun, Moon } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

import * as actionTypes from "../../../store/actions/action-types";
import CampusNav from "../../../components/Navigation/CampusNav/CampusNav";
import Accounts from "../../../components/Accounts/Accounts";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
  },
}));

const CampusLayout = (props) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.global.theme);
  const pageTitle = useSelector((state) => state.global.pageTitle);
  const account = useSelector((state) => state.auth.account);
  const classes = useStyles();
  const handleThemeChange = () => {
    if (theme === "dark") {
      dispatch({ type: actionTypes.SET_GLOBAL_THEME, theme: "light" });
    } else {
      dispatch({ type: actionTypes.SET_GLOBAL_THEME, theme: "dark" });
    }
  };
  return (
    <>
      <CampusNav />
      <div>
        <AppBar
          position="fixed"
          elevation={0}
          color="inherit"
          className="ZubstrAppBar"
        >
          <Toolbar>
            <Typography
              variant="h6"
              style={{ flexGrow: 1, fontWeight: 400 }}
              color="textPrimary"
            >
              {pageTitle}
            </Typography>
            <div>
              <Button color="primary" variant="contained" disableElevation>
                Subscribe
              </Button>
              <IconButton className={classes.icon} aria-label="Nell">
                <Bell />
              </IconButton>
              <IconButton className={classes.icon} onClick={handleThemeChange}>
                {theme === "dark" ? <Moon /> : <Sun />}
              </IconButton>
            </div>
            {account && <Accounts />}
          </Toolbar>
        </AppBar>
      </div>
      <main>{props.children}</main>
    </>
  );
};

export default CampusLayout;
