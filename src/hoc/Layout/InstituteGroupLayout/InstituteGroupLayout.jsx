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
import InstituteGroupNav from "../../../components/Navigation/InstituteGroupNav/InstituteGroupNav";
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

const InstituteGroupLayout = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const backBtnEnabled = useSelector((state) => state.global.isBackBtnEnabled);
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
      <InstituteGroupNav />
      <div>
        <AppBar
          position="fixed"
          elevation={0}
          color="inherit"
          className="ZubstrAppBar"
        >
          <Toolbar>
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

export default InstituteGroupLayout;
