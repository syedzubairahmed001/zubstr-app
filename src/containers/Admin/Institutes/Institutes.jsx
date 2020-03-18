import React, { useState } from "react";
import { Tabs, Tab, Paper, Typography, Box, Grid } from "@material-ui/core";
import { Route, Switch, useRouteMatch, useLocation } from "react-router-dom";

import Campuses from "./Campuses/Campuses";
import CreateCampus from "./CreateCampus/CreateCampus";

const TabPanel = props => {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={index}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
};

const InstituteTabs = props => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        // centered
      >
        <Tab label="Campuses" />
        <Tab label="Principals" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Campuses />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Principals
      </TabPanel>
    </>
  );
};

const Institutes = props => {
  const currentPath = useRouteMatch().path;
  console.log(useRouteMatch());
  return (
    <Box>
      <Paper elevation={0}>
        <Switch>
          <Route
            path={currentPath + "/create-campus"}
            component={CreateCampus}
          />
          <Route path={currentPath} exact component={InstituteTabs} />
        </Switch>
      </Paper>
    </Box>
  );
};

export default Institutes;
