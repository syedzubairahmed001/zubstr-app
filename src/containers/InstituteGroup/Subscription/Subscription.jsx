import React, {useState} from "react";
import { Tabs, Tab, Paper, Typography, Box, Grid } from "@material-ui/core";
import {useDispatch} from 'react-redux'

import NewCustomer from "./NewCustomer/NewCustomer";
import {setPageTitle} from '../../../store/actions/global'

const Subscription = props => {
  const dispatch = useDispatch();
  
  dispatch(setPageTitle('Subscription'))
  return (
    <Box>
      <Paper elevation={0}>
        <NewCustomer />
      </Paper>
    </Box>
  );
};

export default Subscription;
