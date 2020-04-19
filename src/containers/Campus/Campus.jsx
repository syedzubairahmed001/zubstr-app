import React, { useState, useEffect, useContext } from "react";
import { useTransition, animated } from "react-spring";
import { Switch, Redirect, Route, __RouterContext } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Settings/Settings";
import People from "./People/People";
import CampusLayout from "../../hoc/Layout/CampusLayout/CampusLayout";

const College = props => {
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: {
      position: "absolute",
      opacity: 0,
      transform: "translate(100%,0)",
      padding: "1rem",
    },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" },
    config: {
      friction: 20
    }
  });

  return (
    <>
      <CampusLayout>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props} className="AnimatedPage">
            <Switch location={item}>
              <Route path="/c/dashboard" component={Dashboard} />
              <Route path="/c/people" component={People} />
              <Route path="/c/settings" component={Settings} />
              <Redirect to="/c/dashboard" />
            </Switch>
          </animated.div>
        ))}
      </CampusLayout>
    </>
  );
};

export default College;
