import React, { useState } from "react";
import { Tabs, Tab, Paper, Typography, Box, Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";

import Students from "./Students/Students";
import Teachers from "./Teachers/Teachers";

const TabPanel = (props) => {
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

const InstituteTabs = (props) => {
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
        <Tab label="Students" />
        <Tab label="Teachers" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Students />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Teachers />
      </TabPanel>
    </>
  );
};

const H = (props) => {
  return <div></div>;
};

const People = (props) => {
  const currentPath = useRouteMatch().path;
  return (
    <Box>
      <Paper elevation={0}>
        <Switch>
          <Route path={currentPath + "/create-class"} component={H} />
          <Route path={currentPath + "/create-course"} component={H} />
          <Route path={currentPath} exact component={InstituteTabs} />
          <Redirect to={currentPath} />
        </Switch>
      </Paper>
    </Box>
  );
};

export default People;
