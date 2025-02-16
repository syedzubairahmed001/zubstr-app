import axios from "../../axios";
import * as actionTypes from "./action-types";
import Api from "../../global/Api";

export const setPageTitle = (title) => (dispatch) =>
  dispatch({
    type: actionTypes.SET_GLOBAL_PAGE_TITLE,
    pageTitle: title,
  });

export const setBackBtnEnabled = (data) => (dispatch) =>
  dispatch({
    type: actionTypes.SET_BACK_BTN,
  });
export const resetBackBtnEnabled = (data) => (dispatch) =>
  dispatch({
    type: actionTypes.RESET_BACK_BTN,
  });

export const setPostModalOpen = (data) => (dispatch) =>
  dispatch({ type: actionTypes.SET_POST_MODAL_OPEN });

export const resetPostModalOpen = (data) => (dispatch) =>
  dispatch({ type: actionTypes.RESET_POST_MODAL_OPEN });

export const sendPost = (data) => {
  return (dispatch) => {
    return Api(`/v1/post`, data, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__SEND_POST,
    });
  };
};
