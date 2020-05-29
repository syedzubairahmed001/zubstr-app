import React, { Component, useState } from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Avatar,
  Box,
} from "@material-ui/core";
import { Camera, Bell, Sun, Moon, ArrowLeft } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import * as actionTypes from "../../../store/actions/action-types";
import CampusNav from "../../../components/Navigation/CampusNav/CampusNav";
import Accounts from "../../../components/Accounts/Accounts";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.primary,
  },
  backBtn: {
    color: theme.palette.text.primary,
    paddingRight: "1rem",
    cursor: "pointer",
  },
}));

const CampusLayout = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useSelector((state) => state.global.theme);
  const backBtnEnabled = useSelector((state) => state.global.isBackBtnEnabled);
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
          <Toolbar variant="dense">
            {backBtnEnabled && (
              <Box
                className={classes.backBtn}
                aria-label="Nell"
                onClick={() => history.goBack()}
              >
                <ArrowLeft size={20} />
              </Box>
            )}
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
