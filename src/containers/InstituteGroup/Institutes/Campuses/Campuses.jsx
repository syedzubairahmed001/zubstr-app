import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import CampusCard from "../../../../components/CampusCard/CampusCard";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../../store/actions/global";
const Campuses = props => {
  const dispatch = useDispatch();
  dispatch(setPageTitle("Campuses"));
  return (
    <Grid container spacing={2}>
      <Grid item md={3} sm={12} xs={12}>
        <CampusCard isAdd link="/i/institutes/create-campus" />
      </Grid>
      <Grid item md={3} sm={12} xs={12}>
        <CampusCard link="/i/dashboard" />
      </Grid>
      <Grid item md={3} sm={12} xs={12}>
        <CampusCard skeleton />
      </Grid>
    </Grid>
  );
};

export default Campuses;
