import React from "react";
import Navigation from "../Navigation";
import { Home, Users, MessageSquare, Settings, Edit } from "react-feather";
import { useDispatch } from "react-redux";

import { setPostModalOpen } from "../../../store/actions/global";

const InstituteNav = (props) => {
  const dispatch = useDispatch();
  const nav = [
    {
      link: "/c/dashboard",
      tooltip: "Dashboard",
      Icon: Home,
    },
    {
      link: "/c/people",
      tooltip: "People",
      Icon: Users,
    },
    {
      link: "/c/communicate",
      tooltip: "Communicate",
      Icon: MessageSquare,
    },
    {
      link: "/c/settings",
      tooltip: "Settings",
      Icon: Settings,
    },
  ];
  const primaryAction = {
    onClick: () => {
      dispatch(setPostModalOpen());
    },
    tooltip: "New Post",
    Icon: Edit,
  };
  return <Navigation data={nav} primaryAction={primaryAction} />;
};

export default InstituteNav;
