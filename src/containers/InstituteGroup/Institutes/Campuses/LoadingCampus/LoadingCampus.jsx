import React from "react";
import { Grid } from "@material-ui/core";
import CampusCard from "../../../../../components/CampusCard/CampusCard";

const EmptyCampus = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={3} sm={6} xs={12}>
        <CampusCard skeleton />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <CampusCard skeleton />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <CampusCard skeleton />
      </Grid>
      <Grid item md={3} sm={6} xs={12}>
        <CampusCard skeleton />
      </Grid>
    </Grid>
  );
};

export default EmptyCampus;
