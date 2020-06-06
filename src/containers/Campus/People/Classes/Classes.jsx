import React, { useState, useEffect } from "react";
import { Grid, Box, makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import Requests from "../Requests/Requests";
import Card03 from "../../../../components/Card03/Card03";
import { getClasses } from "../../../../store/actions/campus";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
  },
  gridContainer: {
    width: "100%",
  },
}));

const Students = (props) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { data, loadedOnce } = useSelector((state) => state.campus.classes);
  useEffect(() => {
    if (!loadedOnce) {
      dispatch(getClasses());
    }
  }, [dispatch]);

  const classCards = data.map((e) => (
    <Grid item md={3} sm={6} xs={12} key={e._id}>
      <Card03 heading={e.name} subHeading="class" />
    </Grid>
  ));

  return (
    <>
      <Box className={styles.container}>
        {/* <Box className={styles.usersContainer}> */}
        <Grid container spacing={2} className={styles.gridContainer}>
          {classCards}
        </Grid>
        {/* </Box> */}
        {/* <Box className={styles.requestContainer}>
          <Requests />
        </Box> */}
      </Box>
    </>
  );
};

export default Students;
