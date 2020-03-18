import * as actionTypes from "./action-types";
import Api from "../../global/Api";

export const createCampus = data => {
  return dispatch => {
    const { campusData } = data;
    console.log(campusData)
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
