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
    return Api("/v1/request/campus", null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__STUDENT_ADMISSION_REQUESTS,
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
