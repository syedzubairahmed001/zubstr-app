import React from "react";
import { useSelector } from "react-redux";

import Logo from "../Logo/Logo";
import classes from "./AppLoading.module.scss";

const AppLoading = (props) => {
  const theme = useSelector((state) => state.global.theme);
  return (
    <div
      className={classes.AppLoading}
      style={{ backgroundColor: theme === "dark" ? "#333" : "#fff" }}
    >
      <div className={classes.AppLoading__LogoContainer}>
        <Logo width="50px" />
      </div>
    </div>
  );
};

export default AppLoading;
