import * as actionTypes from "./action-types";
import Api from "../../global/Api";

export const createCampus = data => {
  return dispatch => {
    const { campusData } = data;
    console.log(campusData);
    if (!campusData) {
      return Promise.reject("campusData not found");
    }

    return Api("/v1/campus", campusData, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__CREATE_CAMPUS
    });
  };
};

export const createSubscription = data => {
  return dispatch => {
    const { subscriptionData } = data;
    console.log(subscriptionData);
    if (!subscriptionData) {
      return Promise.reject("campusData not found");
    }

    return Api("/v1/subscription", subscriptionData, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__CREATE_SUBSCRIPTION
    });
  };
};

export const subscriptionFail = data => {
  return dispatch => {
    return Api("/v1/subscription/fail", null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__SUBSCRIPTION_FAIL
    });
  };
};
