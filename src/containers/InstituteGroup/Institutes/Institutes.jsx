import React, { useState } from "react";
import { Tabs, Tab, Paper, Typography, Box, Grid } from "@material-ui/core";
import {
  Route,
  Switch,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";

import Campuses from "./Campuses/Campuses";
import CreateCampus from "./CreateCampus/CreateCampus";
import ViewCampus from "./ViewCampus/ViewCampus";

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
      {value === index && <Box pt={3}>{children}</Box>}
    </Typography>
  );
};

const InstituteTabs = (props) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box>
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
    </Box>
  );
};

const Institutes = (props) => {
  const currentPath = useRouteMatch().path;

  return (
    <Box>
      <Box>
        <Switch>
          <Route path={currentPath + "/campus"} component={CreateCampus} />
          <Route
            path={currentPath + "/view/:campusId"}
            component={ViewCampus}
          />
          <Route path={currentPath} exact component={InstituteTabs} />
          <Redirect to={currentPath} />
        </Switch>
      </Box>
    </Box>
  );
};

export default Institutes;
