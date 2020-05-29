import React from "react";
import { Box, Grid } from "@material-ui/core";

import CampusCard from "../../../../../components/CampusCard/CampusCard";

const DisplayCampus = (props) => {
  let CampusArr = [];

  props.data &&
    Array.isArray(props.data) &&
    props.data.forEach((e, index) => {
      if (index === 0) {
        CampusArr.push(
          <Grid item md={3} sm={6} xs={12} key={"add-campus"}>
            <CampusCard isAdd link="/i/campuses/campus" />
          </Grid>
        );
      }
      CampusArr.push(
        <Grid item md={3} sm={6} xs={12} key={e._id}>
          <CampusCard
            name={e.name}
            type={e.campusType}
            campusId={e._id}
            link={`/i/campuses/view/${e._id}`}
          />
        </Grid>
      );
    });
  return (
    <Grid container spacing={2}>
      {CampusArr}
    </Grid>
  );
};

export default DisplayCampus;
