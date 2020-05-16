import React, { useState } from "react";
import {
  Box,
  Paper,
  Grid,
  makeStyles,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  useHistory,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useLocation,
  Link,
} from "react-router-dom";
import { ArrowLeft, ChevronDown } from "react-feather";

import Section from "./Section/Section";
import ClassComp from "./Class/Class";
import ClassGroup from "./ClassGroup/ClassGroup";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  sectionOne: {
    display: "flex",
    alignItems: "center",
  },
}));

const Create = (props) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const currentPath = useRouteMatch().path;
  let currentCreate = useLocation().pathname;
  currentCreate = currentCreate.split("/").reverse()[0].replace("-", " ");
  console.log(currentCreate);

  const handleBack = () => {
    history.goBack();
  };
  const handleSelectClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  return (
    <Box>
      <Paper>
        <Box className={classes.container} p={3}>
          <Box className={classes.sectionOne}>
            <IconButton color="inherit" onClick={handleBack}>
              <ArrowLeft />
            </IconButton>
            <Box ml={3} style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5" style={{ textTransform: "capitalize" }}>
                Create {currentCreate}
              </Typography>
              <IconButton
                color="inherit"
                onClick={handleSelectClick}
                aria-controls="create-select"
              >
                <ChevronDown />
              </IconButton>
              <Menu
                id="create-select"
                anchorEl={anchorEl}
                keepMounted
                elevation={1}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    history.push(currentPath + "/section");
                    handleClose();
                  }}
                >
                  Section
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    history.push(currentPath + "/class");
                    handleClose();
                  }}
                >
                  Class
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    history.push(currentPath + "/class-group");
                    handleClose();
                  }}
                >
                  Class Group
                </MenuItem>
              </Menu>
            </Box>
          </Box>
          <Box mt={2}>
            <Switch>
              <Route path={currentPath + "/class"} component={ClassComp} />
              <Route
                path={currentPath + "/class-group"}
                component={ClassGroup}
              />
              <Route path={currentPath + "/section"} component={Section} />
              <Redirect to={currentPath + "/class"} />
            </Switch>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const H = (props) => {
  return <div></div>;
};
export default Create;
