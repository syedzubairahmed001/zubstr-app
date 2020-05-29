import React from "react";
import { Box, Typography, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "12rem",
    display: "flex",
    // alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "1rem",
  },
  part1: {},
}));

const Card03 = (props) => {
  const styles = useStyles();
  const { heading } = props || {};
  return (
    <Paper className={styles.container} variant="outlined">
      <Box>
        {heading && (
          <Typography variant="h5" color="textPrimary">
            {heading}
          </Typography>
        )}
        <Typography variant="caption" color="textSecondary">
          Something
        </Typography>
      </Box>
      <Box>
        <Box>hello</Box>
        <Box></Box>
      </Box>
    </Paper>
  );
};

export default Card03;
