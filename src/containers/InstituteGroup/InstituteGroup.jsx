import React, { useState, useEffect, useContext } from "react";
import { useTransition, animated } from "react-spring";
import { Switch, Redirect, Route, __RouterContext } from "react-router-dom";

import Dashboard from "./Dashboard/Dashboard";
import Settings from "./Settings/Settings";
import Subscription from "./Subscription/Subscription";
import Institutes from "./Institutes/Institutes";
import InstituteGroupLayout from "../../hoc/Layout/InstituteGroupLayout/InstituteGroupLayout";

const College = props => {
  //TODO: combine animations in one file
  const { location } = useContext(__RouterContext);
  const transitions = useTransition(location, location => location.pathname, {
    from: {
      position: "absolute",
      opacity: 0,
      transform: "translate(100%,0)",
      padding: "1rem"
    },
    enter: { opacity: 1, transform: "translate(0%,0)" },
    leave: { opacity: 0, transform: "translate(-50%,0)" },
    config: {
      friction: 20
    }
  });

  return (
    <>
      <InstituteGroupLayout>
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props} className="AnimatedPage">
            <Switch location={item}>
              <Route path="/i/dashboard" component={Dashboard} />
              <Route path="/i/institutes" component={Institutes} />
              <Route path="/i/subscription" component={Subscription} />
              <Route path="/i/settings" component={Settings} />
              <Redirect to="/i/dashboard" />
            </Switch>
          </animated.div>
        ))}
      </InstituteGroupLayout>
    </>
  );
};

export default College;
