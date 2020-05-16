import React from "react";
import {
  IconButton,
  Box,
  makeStyles,
  Badge,
  Button,
  Tooltip,
} from "@material-ui/core";
import { Plus, Users } from "react-feather";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: "1rem",
    backgroundColor: theme.palette.background.default,
  },
  createBtn: {
    marginRight: "1rem",
    borderRadius: "2rem",
  },
  createBtnLink: {
    textDecoration: "none",
  },
  container: {
    padding: "1rem",
  },
}));

const ToolBar = (props) => {
  const classes = useStyles();
  const { onRequestsBtnClick } = props;

  return (
    <Box className={classes.container}>
      <Box>
        <Link to="/c/people/create" className={classes.createBtnLink}>
          <Tooltip title="Create Classes, Class Group...">
            <Button
              variant="contained"
              color="primary"
              className={classes.createBtn}
              disableElevation
              startIcon={<Plus />}
              size="large"
            >
              Create
            </Button>
          </Tooltip>
        </Link>
        <Tooltip title="Requests">
          <IconButton
            aria-label="delete"
            className={classes.icon}
            onClick={onRequestsBtnClick}
          >
            <Badge badgeContent={4} color="primary">
              <Users />
            </Badge>
          </IconButton>
        </Tooltip>
        {/* <IconButton aria-label="delete" className={classes.icon}>
          <Badge badgeContent={4} color="primary">
            <Plus />
          </Badge>
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default ToolBar;
