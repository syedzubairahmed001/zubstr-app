import React from "react";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  hide: {},
  "@media only screen and (max-width:600px)": {
    hide: {
      display: "none"
    }
  }
}));

const HideOnPhone = props => {
  const classes = useStyles();

  return (
    <Box className={classes.hide} {...props}>
      {props.children}
    </Box>
  );
};

export default HideOnPhone;
