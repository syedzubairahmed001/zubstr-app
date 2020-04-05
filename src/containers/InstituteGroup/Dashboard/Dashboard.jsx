import React from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../store/actions/global";

import Accounts from "../../../components/Accounts/Accounts";

const Dashboard = props => {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Dashboard"));
  return <div>s</div>;
};

export default Dashboard;
