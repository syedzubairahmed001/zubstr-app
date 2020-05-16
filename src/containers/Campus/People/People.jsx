import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Paper,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import {
  Route,
  Switch,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";

import Requests from "./Requests/Requests";
import ToolBar from "./ToolBar/Toolbar";
import Students from "./Students/Students";
import Teachers from "./Teachers/Teachers";
import Create from "./Create/Create";

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
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const handleRequestsClose = () => {
    setRequestModalOpen(false);
  };
  const handleRequestsOpen = () => {
    setRequestModalOpen(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Requests
        open={requestModalOpen}
        onClose={handleRequestsClose}
        onCloseBtnClick={handleRequestsClose}
      />
      <ToolBar onRequestsBtnClick={handleRequestsOpen} />
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

const People = (props) => {
  const currentPath = useRouteMatch().path;
  return (
    <Box>
      <Paper elevation={0}>
        <Switch>
          <Route path={currentPath + "/create"} component={Create} />
          <Route path={currentPath} exact component={InstituteTabs} />
          <Redirect to={currentPath} />
        </Switch>
      </Paper>
    </Box>
  );
};

export default People;
