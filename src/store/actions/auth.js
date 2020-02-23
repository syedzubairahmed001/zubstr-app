import axios from "axios";

import * as actionTypes from "./action-types";

const storeTokens = (a, r) => {
  localStorage.setItem("a-id", a);
  localStorage.setItem("r-id", r);
};
export const requestLogin = () => ({
  type: actionTypes.REQUEST_LOGIN
});

export const succesLogin = (accessToken, refreshToken) => ({
  type: actionTypes.SUCCESS_LOGIN,
  accessToken,
  refreshToken
});
export const errorLogin = error => ({
  type: actionTypes.ERROR_LOGIN,
  error
});
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  return {
    type: actionTypes.LOGOUT
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(requestLogin());
    const loginData = {
      email,
      password
    };
    let url = "https://staging.api.zubstr.com/auth/login";

    axios
      .post(url, loginData)
      .then(res => {
        if (res.data.accessToken && res.data.refreshToken) {
          storeTokens(res.data.accessToken, res.data.refreshToken);
          dispatch(succesLogin(res.data.access, res.data.refresh));
        } else {
          dispatch(errorLogin((new Error().message = "cannot fetch tokens")));
        }
      })
      .catch(err => {
        dispatch(errorLogin(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const accessToken = localStorage.getItem("a-id");
    const refreshToken = localStorage.getItem("r-id");
    if (!accessToken && !refreshToken) {
      dispatch(logout());
    } else {
      dispatch(succesLogin(accessToken, refreshToken));
    }
  };
};
