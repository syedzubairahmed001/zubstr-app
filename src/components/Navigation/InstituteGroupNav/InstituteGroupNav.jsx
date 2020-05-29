import React from "react";
import Navigation from "../Navigation";
import { Home, CreditCard, Grid, Settings } from "react-feather";

const InstituteNav = props => {
  const nav = [
    {
      link: "/i/dashboard",
      tooltip: "Dashboard",
      Icon: Home
    },
    {
      link: "/i/campuses",
      tooltip: "Institutes",
      Icon: Grid
    },
    {
      link: "/i/subscription",
      tooltip: "Subscription",
      Icon: CreditCard
    },
    {
      link: "/i/settings",
      tooltip: "Settings",
      Icon: Settings
    }
  ];
  return <Navigation data={nav} />;
};

export default InstituteNav;
