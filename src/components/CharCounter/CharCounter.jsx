import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  progressSuccess: {
    color: theme.palette.success.main
  },
  progressError: {
    color: theme.palette.error.main
  }
}));

const CharCounter = props => {
  const { count, maxCount } = props || {};
  const classes = useStyles();
  let classname = [];
  let value = (count / maxCount) * 100;
  if (count >= maxCount) {
    if (count === maxCount) {
      classname.push(classes.progressSuccess);
    } else {
      classname.push(classes.progressError);
    }
    value = 100;
  }
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <Typography variant="caption" className={classname.join(" ")}>
          {count} / {maxCount}
        </Typography>
      </Box>
      <Box ml={1}>
        <CircularProgress
          variant="static"
          value={value}
          color="primary"
          style={{ width: "1.5rem", height: "1.5rem" }}
          className={classname.join(" ")}
        />
      </Box>
    </Box>
  );
};

export default CharCounter;
