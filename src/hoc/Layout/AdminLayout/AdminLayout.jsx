import React, { Component } from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from "@material-ui/core";
import { Camera, Bell, Sun, Moon } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

import * as actionTypes from "../../../store/actions/action-types";
import AdminNav from "../../../components/Navigation/AdminNav/AdminNav";

const AdminLayout = props => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.global.theme);
  const pageTitle = useSelector(state => state.global.pageTitle)
  const handleThemeChange = () => {
    if (theme === "dark") {
      dispatch({ type: actionTypes.SET_GLOBAL_THEME, theme: "light" });
    } else {
      dispatch({ type: actionTypes.SET_GLOBAL_THEME, theme: "dark" });
    }
  };
  return (
    <>
      <AdminNav />
      <div>
        <AppBar
          position="fixed"
          elevation={0}
          color="inherit"
          style={{ left: "3rem", paddingRight: "4rem", paddingLeft: "2rem" }}
        >
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 400 }}>
              {pageTitle}
            </Typography>
            <div>
              <Button color="inherit">Login</Button>
              <IconButton color="inherit" aria-label="menu">
                <Camera strokeWidth={1.5} />
              </IconButton>
              <IconButton color="inherit" aria-label="Nell">
                <Bell />
              </IconButton>
              <IconButton color="inherit" onClick={handleThemeChange}>
                {theme === "dark" ? <Moon /> : <Sun />}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <main>{props.children}</main>
    </>
  );
};

export default AdminLayout;
