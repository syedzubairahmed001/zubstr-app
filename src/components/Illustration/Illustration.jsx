import React from "react";
import { Typography, Box, makeStyles } from "@material-ui/core";

import Campus from "../../assets/images/illustrations/campus.svg";
import InstituteGroup from "../../assets/images/illustrations/institute_group.svg";

const useStyles = makeStyles((theme) => ({
  InsWithBg: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.primary.light,
    borderRadius: "50%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  campusWithBg: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.secondary.light,
    borderRadius: "50%",
  },
  illustrationWithBg: {
    width: "60%",
    height: "60%",
    display: "inline-block",
    userSelect: "none",
  },
}));

const Illustration = (props) => {
  const { type, withBg } = props;
  const classes = useStyles();
  let imageSource = InstituteGroup,
    className;

  switch (type) {
    case "campus":
      imageSource = Campus;
      className = classes.campusWithBg;
      break;
    default:
      className = classes.InsWithBg;
      imageSource = InstituteGroup;
  }
  return (
    <>
      {withBg ? (
        <Box className={className}>
          <img
            src={imageSource}
            alt="illustration"
            className={classes.illustrationWithBg}
          />
        </Box>
      ) : (
        <img
          src={imageSource}
          alt="illustration"
          style={{
            width: "100%",
            height: "100%",
            display: "inline-block",
            userSelect: "none",
          }}
        />
      )}
    </>
  );
};

export default Illustration;
