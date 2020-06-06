import * as actionTypes from "./action-types";
import Api from "../../global/Api";

export const createInstituteGroup = (data) => {
  const { body } = data;
  return (dispatch) => {
    if (!body) {
      Promise.reject({ error: "data is not valid" });
    }

    return Api("/v1/institute-group", body, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__CREATE_INSTITUTE_GROUP,
    });
  };
};

export const uploadInstituteGroupProfileImage = (data) => {
  const { instituteGroupId, body } = data;
  return (dispatch) => {
    if (!body || !instituteGroupId) {
      Promise.reject({ error: "data is not valid" });
    }

    return Api(`/v1/institute-group/profile-image/${instituteGroupId}`, body, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__UPLOAD_INSTITUTE_GROUP_PROFILE_IMAGE,
    });
  };
};

export const registerNotificationToken = (data) => {
  return (dispatch) => {
    if (!data) {
      Promise.reject({ error: "data is not valid" });
    }

    return Api(`/v1/notification/token`, data, {
      method: "POST",
      dispatch,
      actionType: actionTypes.REQUEST__REGISTER_NOTIF_TOKEN,
    });
  };
};

export const requestResetPasswordEmail = (data) => {
  return (dispatch) => {
    if (!data) {
      Promise.reject({ error: "data is not valid" });
    }

    return Api(`/user/forgot-password`, data, {
      method: "POST",
      dispatch,
      actionType: actionTypes.REQUEST__FORGOT_PASSWORD,
    });
  };
};

export const resetPassword = (data) => {
  return (dispatch) => {
    if (!data) {
      Promise.reject({ error: "data is not valid" });
    }

    return Api(`/user/reset-password`, data, {
      method: "POST",
      dispatch,
      actionType: actionTypes.REQUEST__RESET_PASSWORD,
    });
  };
};

export const getCampus = (data) => {
  return (dispatch) => {
    if (!data) {
      Promise.reject({ error: "data is not valid" });
    }

    return Api(`/v1/campus/${data}`, null, {
      method: "GET",
      dispatch,
      actionType: actionTypes.REQUEST__GET_CAMPUS,
    });
  };
};
