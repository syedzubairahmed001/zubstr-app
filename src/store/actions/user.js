import * as actionTypes from "./action-types";
import Api from "../../global/Api";

export const createInstituteGroup = data => {
  const { body } = data;
  return dispatch => {
    if (!body) {
      Promise.reject({ error: "data is not valid" });
    }

    return Api("/v1/institute-group", body, {
      method: "post",
      dispatch,
      isMultipart: true,
      actionType: actionTypes.REQUEST__CREATE_INSTITUTE_GROUP
    });
  };
};
