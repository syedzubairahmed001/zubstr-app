import React, { useEffect } from "react";
import { Route, Switch, Redirect, Link } from "react-router-dom";

import GetStarted from "./GetStarted/GetStarted";
import CreateInstituteGroup from "./CreateInstituteGroup/CreateInstituteGroup";

const User = (props) => {
  useEffect(() => {
    localStorage.removeItem("current-acc-id");
    localStorage.removeItem("current-acc-type");
  }, []);
  return (
    <Switch>
      <Route path="/u/get-started" component={GetStarted} />
      <Route
        path="/u/create-institute-group"
        component={CreateInstituteGroup}
      />
      <Redirect to="/u/get-started" />
    </Switch>
  );
};

export default User;
