import React, { useState, useEffect } from "react";
import { Tabs, Tab, Paper, Typography, Box, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import NewCustomer from "./NewCustomer/NewCustomer";
import Subscribed from "./Subscribed/Subscribed";
import { setPageTitle } from "../../../store/actions/global";

const Subscription = (props) => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.auth.account);
  const { subscription } = account || {};
  const { isTrial } = subscription || {};
  useEffect(() => {
    dispatch(setPageTitle("Subscription"));
  }, []);
  return (
    <Box>
      <Paper elevation={0}>
        {isTrial && <NewCustomer />}
        {!isTrial && <Subscribed />}
      </Paper>
    </Box>
  );
};

export default Subscription;
