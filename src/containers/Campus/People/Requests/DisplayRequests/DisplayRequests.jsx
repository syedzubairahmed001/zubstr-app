import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@material-ui/core";

import { getStudentRequests } from "../../../../../store/actions/campus";
import RequestCard from "../../../../../components/RequestCard/RequestCard";

const DisplayRequests = ({ type, onAcceptClick }) => {
  const dispatch = useDispatch();
  const studentRequests = useSelector(
    (state) => state.campus.requests.student.data
  );
  const studentRequestsLoading = useSelector(
    (state) => state.campus.requests.student.isLoading
  );
  const isStudentLoadedOnce = useSelector(
    (state) => state.campus.requests.student.isLoadedOnce
  );
  const teacherRequests = useSelector(
    (state) => state.campus.requests.teacher.data
  );
  useEffect(() => {
    if (type === "student" && !isStudentLoadedOnce) {
      dispatch(getStudentRequests());
    }
  }, [dispatch]);
  const studentCards = [];
  studentRequests &&
    Array.isArray(studentRequests) &&
    studentRequests.forEach((e) =>
      studentCards.push(
        <Grid item md={4} key={e._id}>
          <RequestCard
            msg={e.msg}
            requestId={e._id}
            studentId={e.student[0]._id}
            sentOn={e.createdAt}
            name={e.student[0].personalData.name}
            onAcceptClick={onAcceptClick}
            location={e.student[0].personalData.location}
            profileImageUrl={e.student[0].personalData.profileImageUrl}
          />
        </Grid>
      )
    );
  if (type === "student" && studentRequestsLoading) {
    return <LoadingRequests />;
  }
  return (
    <Grid container spacing={2}>
      {type === "student" && studentCards}
    </Grid>
  );
};

const LoadingRequests = (props) => {
  return (
    <Grid container spacing={2}>
      <Grid item md={4}>
        <RequestCard loading />
      </Grid>
      <Grid item md={4}>
        <RequestCard loading />
      </Grid>
    </Grid>
  );
};

export default DisplayRequests;
