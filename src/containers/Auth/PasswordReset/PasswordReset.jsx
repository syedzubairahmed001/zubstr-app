import React from "react";
import { Grid, TextField, Box, Typo } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";

import SendReset from "./SendReset/SendReset";

const PasswordReset = (props) => {
  return (
    <Box>
      <Switch>
        <Route path="/auth/reset-password" exact component={SendReset} />
      </Switch>
    </Box>
  );
};

export default PasswordReset;
