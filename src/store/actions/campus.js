import * as actionTypes from "./action-types";
import Api from "../../global/Api";

export const createClass = (data) => {
  return (dispatch) => {
    if (!data) {
      Promise.reject({ error: "data not found" });
    }
    return Api("/v1/class", data, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__CREATE_CLASS,
    });
  };
};

export const getStudentRequests = () => {
  return (dispatch) => {
    return Api("/v1/request/campus?type=student", null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__STUDENT_ADMISSION_REQUESTS,
    });
  };
};

export const getTeacherRequests = () => {
  return (dispatch) => {
    return Api("/v1/request/campus?type=teacher", null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__TEACHER_JOIN_REQUESTS,
    });
  };
};

export const acceptStudentRequest = (data) => {
  return (dispatch) => {
    return Api("/v1/request/campus/accept", data, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__ACCEPT_STUDENT_ADMISSION_REQUEST,
    });
  };
};

export const rejectStudentRequest = (data) => {
  return (dispatch) => {
    return Api("/v1/request/campus/reject", data, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__REJECT_STUDENT_ADMISSION_REQUEST,
    });
  };
};

export const acceptTeacherRequest = (data) => {
  return (dispatch) => {
    return Api("/v1/request/campus/accept", data, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__ACCEPT_TEACHER_JOIN_REQUEST,
    });
  };
};

export const rejectTeacherRequest = (data) => {
  return (dispatch) => {
    return Api("/v1/request/campus/reject", data, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__REJECT_TEACHER_JOIN_REQUEST,
    });
  };
};

export const searchClasses = (data) => {
  const { query, limit } = data;
  return (dispatch) => {
    return Api(`/v1/search/class?query=${query}`, null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__SEARCH_CLASS,
    });
  };
};

export const getClasses = (data) => {
  // const { query, limit } = data;
  return (dispatch) => {
    return Api(`/v1/class`, null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__GET_CLASSES,
    });
  };
};

