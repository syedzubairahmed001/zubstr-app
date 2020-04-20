import * as actionTypes from "./action-types";
import Api from "../../global/Api";

export const createCampus = (data) => {
  return (dispatch) => {
    const { body } = data;
    if (!body) {
      return Promise.reject("body not found");
    }
    return Api("/v1/campus", body, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__CREATE_CAMPUS,
    });
  };
};
export const uploadCampusProfileImage = (data) => {
  return (dispatch) => {
    const { body, campusId } = data;
    if (!body || !campusId) {
      return Promise.reject("data is missing");
    }
    return Api(`/v1/campus/profile-image/${campusId}`, body, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__UPLOAD_CAMPUS_PROFILE_IMAGE,
    });
  };
};

export const createSubscription = (data) => {
  return (dispatch) => {
    const { subscriptionData } = data;
    console.log(subscriptionData);
    if (!subscriptionData) {
      return Promise.reject("campusData not found");
    }

    return Api("/v1/subscription", subscriptionData, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__CREATE_SUBSCRIPTION,
    });
  };
};

export const subscriptionFail = (data) => {
  return (dispatch) => {
    return Api("/v1/subscription/fail", null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__SUBSCRIPTION_FAIL,
    });
  };
};

export const getCampuses = () => {
  return (dispatch) => {
    return Api("/v1/campus", null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__GET_CAMPUSES,
    });
  };
};

export const setCampusShouldLoad = (shouldLoad) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_CAMPUS_SHOULD_LOAD, data: shouldLoad})
  };
}
