import React from "react";
import logoLightShadow from "../../assets/logo/zubstr_logo__light_shadow.svg";
import logoPrimary from "../../assets/logo/zubstr_logo__primary.svg";

const logo = props => {
  let width = "1.5rem";
  let variant = logoPrimary;
  if (props.width) {
    width = props.width;
  }
  if (props.variant) {
    switch (props.variant) {
      case "lightShadow":
        variant = logoLightShadow;
        break;
      default:
        variant = logoPrimary;
    }
  }
  return (
    <>
      <img src={variant} style={{ width }} alt="logo" />
    </>
  );
};

export default logo;
