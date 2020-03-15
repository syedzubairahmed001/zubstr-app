import React, { Component } from "react";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton
} from "@material-ui/core";
import { Camera, Bell } from "react-feather";

import AdminNav from "../../../components/Navigation/AdminNav/AdminNav";

const AdminLayout = props => {
  return (
    <>
      <AdminNav />
      <div>
        <AppBar
          position="fixed"
          elevation={false}
          color="#fff"
          style={{ left: "4rem" }}
        >
          <Toolbar>
            <Typography variant="h6">Admin</Typography>
            <div>
              <Button color="inherit">Login</Button>
              <IconButton color="inherit" aria-label="menu">
                <Camera strokeWidth={1.5} />
              </IconButton>
              <IconButton color="inherit" aria-label="Nell">
                <Bell />
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
