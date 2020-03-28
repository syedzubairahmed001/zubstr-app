import React, { useState, useEffect, useContext } from "react";
import { useTransition, animated } from "react-spring";
import { Switch, Redirect, Route, __RouterContext } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Settings/Settings";
import InstituteLayout from "../../hoc/Layout/InstituteLayout/InstituteLayout";

const College = props => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: {
      position: "absolute",
      width: "100%",
      opacity: 0,
      transform: "translate(100%,0)"
    },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" }
  });

  return (
    <>
      <InstituteLayout>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <Switch location={item}>
              <Route path="/c/dashboard" component={Dashboard} />
              <Route path="/c/settings" component={Settings} />
              <Redirect to="/c/dashboard" />
            </Switch>
          </animated.div>
        ))}
      </InstituteLayout>
    </>
  );
};

export default College;
