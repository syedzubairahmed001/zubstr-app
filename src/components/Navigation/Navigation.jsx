import React from "react";
import { NavLink } from "react-router-dom";
import { Badge, Tooltip, Zoom } from "@material-ui/core";
import { useSpring as spring, animated } from "react-spring";

import classes from "./navigation.module.scss";
import Logo from "../Logo/Logo";

const navigation = props => {
  const { data } = props || null;
  const nav = [];
  if (data && Array.isArray(data)) {
    data.forEach(e => {
      nav.push(
        <Tooltip TransitionComponent={Zoom} title={e.tooltip} placement="right" key={e.link} >
          <NavLink
            to={e.link}
            
            activeClassName={classes.activeNavItem}
            className={classes.navItem}
          >
            <e.Icon size={30} strokeWidth={1} />
          </NavLink>
        </Tooltip>
      );
    });
  }
  const slide = spring({
    from: {
      // transform: 'translateX(-100px)'
      width: "0rem"
    },
    to: {
      // transform: 'translateX(0)',
      width: "4rem"
    }
  });

  return (
    <animated.div className={classes.navContainer} style={slide}>
      <div className={classes.logoContainer}>
        <Logo variant="lightShadow" />
      </div>
      <nav>
        <div>
          {nav}
          {/* <NavLink
            to="/i/dashboard"
            activeClassName={classes.activeNavItem}
            className={classes.navItem}
          >
            <Home size={30} strokeWidth={1} />
          </NavLink>
          <NavLink
            to="/xyz"
            activeClassName={classes.activeNavItem}
            className={classes.navItem}
          >
            <Users size={30} strokeWidth={1} />
          </NavLink>
          <NavLink
            to="/xyz"
            activeClassName={classes.activeNavItem}
            className={classes.navItem}
          >
            <Badge variant="dot" color="error" overlap="circle">
              <MessageSquare size={30} strokeWidth={1} />
            </Badge>
          </NavLink>
          <NavLink
            to="/i/settings"
            activeClassName={classes.activeNavItem}
            className={classes.navItem}
          >
            <Settings size={30} strokeWidth={1} />
          </NavLink> */}
        </div>
      </nav>
    </animated.div>
  );
};

export default navigation;
