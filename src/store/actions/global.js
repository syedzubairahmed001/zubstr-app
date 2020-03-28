import axios from "../../axios";
import * as actionTypes from "./action-types";
import Api from "../../global/Api";

export const setPageTitle = title => dispatch => dispatch({
  type: actionTypes.SET_GLOBAL_PAGE_TITLE,
  pageTitle: title
});
