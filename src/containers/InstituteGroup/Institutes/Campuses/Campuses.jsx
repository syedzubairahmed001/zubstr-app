import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import CampusCard from "../../../../components/CampusCard/CampusCard";
import EmptyCampus from "./EmptyCampus/EmptyCampus";
import DisplayCampus from "./DisplayCampus/DisplayCampus";
import LoadingCampus from "./LoadingCampus/LoadingCampus";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../../store/actions/global";
import {
  getCampuses,
  setCampusShouldLoad,
} from "../../../../store/actions/instituteGroup";

const Campuses = (props) => {
  const dispatch = useDispatch();
  const campuses = useSelector((state) => state.instituteGroup.campuses);
  const { data, isLoading, shouldLoad } = campuses;

  useEffect(() => {
    dispatch(setPageTitle("Campuses"));
    if (!data || shouldLoad) {
      dispatch(getCampuses())
        .then((res) => {
          console.log(res);
          dispatch(setCampusShouldLoad(false));
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch]);

  return (
    <>
      {data && !isLoading && <DisplayCampus data={data} />}
      {isLoading && <LoadingCampus />}
      {(!data || (Array.isArray(data) && data.length === 0)) && !isLoading && (
        <EmptyCampus />
      )}
    </>
  );
};

export default Campuses;
