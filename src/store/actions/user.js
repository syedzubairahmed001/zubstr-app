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
