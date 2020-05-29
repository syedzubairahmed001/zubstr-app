import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@material-ui/core";

import {
  getStudentRequests,
  getTeacherRequests,
} from "../../../../../store/actions/campus";
import RequestCard from "../../../../../components/RequestCard/RequestCard";

const DisplayRequests = ({ type, onAcceptClick, onRejectClick }) => {
  const dispatch = useDispatch();
  const studentRequests = useSelector(
    (state) => state.campus.requests.student.data
  );
  const teacherRequests = useSelector(
    (state) => state.campus.requests.teacher.data
  );
  const studentRequestsLoading = useSelector(
    (state) => state.campus.requests.student.isLoading
  );
  const teacherRequestsLoading = useSelector(
    (state) => state.campus.requests.teacher.isLoading
  );
  const isStudentLoadedOnce = useSelector(
    (state) => state.campus.requests.student.isLoadedOnce
  );
  const isTeacherLoadedOnce = useSelector(
    (state) => state.campus.requests.teacher.isLoadedOnce
  );
  useEffect(() => {
    if (type === "student" && !isStudentLoadedOnce) {
      dispatch(getStudentRequests());
    }
    if (type === "teacher" && !isTeacherLoadedOnce) {
      dispatch(getTeacherRequests());
    }
  }, [dispatch]);
  const requestsCards = [];
  studentRequests &&
    Array.isArray(studentRequests) &&
    studentRequests.length > 0 &&
    studentRequests.forEach((e) =>
      requestsCards.push(
        <Grid item md={4} key={e._id}>
          <RequestCard
            msg={e.msg}
            requestId={e._id}
            studentId={e.student[0]._id}
            accType="student"
            sentOn={e.createdAt}
            name={e.student[0].personalData.name}
            onAcceptClick={onAcceptClick}
            onRejectClick={onRejectClick}
            location={e.student[0].personalData.location}
            profileImageUrl={e.student[0].personalData.profileImageUrl}
          />
        </Grid>
      )
    );
  teacherRequests &&
    Array.isArray(teacherRequests) &&
    teacherRequests.length > 0 &&
    teacherRequests.forEach((e) =>
      requestsCards.push(
        <Grid item md={4} key={e._id}>
          <RequestCard
            msg={e.msg}
            requestId={e._id}
            studentId={e.teacher[0]._id}
            accType="teacher"
            sentOn={e.createdAt}
            name={e.teacher[0].personalData.name}
            onAcceptClick={onAcceptClick}
            onRejectClick={onRejectClick}
            location={e.teacher[0].personalData.location}
            profileImageUrl={e.teacher[0].personalData.profileImageUrl}
          />
        </Grid>
      )
    );
  if (
    (type === "student" && studentRequestsLoading) ||
    (type === "teacher" && teacherRequestsLoading)
  ) {
    return <LoadingRequests />;
  }
  return (
    <Grid container spacing={2}>
      {requestsCards}
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
