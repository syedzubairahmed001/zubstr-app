import React from "react";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { Users } from "react-feather";
import Lottie from "react-lottie";

import users from "../../../../../assets/lottiefiles/users.json";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
}));

const EmptyRequest = ({ type }) => {
  const styles = useStyles();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: users,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Box>
      <Box className={styles.container}>
        <Lottie options={defaultOptions} height={200} width={200} />
        <Box>
          <Typography align="center" color="textSecondary" variant="body1">
            When ever any {type === "student" ? "student" : "teacher"} sends
            request to join your campus, it will appear here
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EmptyRequest;
