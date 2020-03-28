import * as actionTypes from "./action-types";
import Api from "../../global/Api";

export const logout = () => {
  localStorage.removeItem("a-id");
  localStorage.removeItem("r-id");
  localStorage.removeItem("c-url");

  return {
    type: actionTypes.LOGOUT
  };
};

export const login = data => {
  const { email, password } = data;
  return dispatch => {
    if (!email || !password) {
      Promise.reject({ error: "data is not valid" });
    }

    const loginData = {
      email,
      password
    };
    return Api("/auth/login", loginData, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__LOGIN
    });
  };
};

export const signup = data => {
  const { name, email, phone, password } = data;
  return dispatch => {
    if (!email || !password || !name || !phone) {
      Promise.reject({ error: "data is not valid" });
    }
    const signupData = {
      name,
      email,
      phone,
      password
    };
    return Api("/auth/signup", signupData, {
      method: "post",
      dispatch,
      actionType: actionTypes.REQUEST__SIGNUP
    });
  };
};

export const verifyEmail = data => {
  const { token } = data || null;
  return dispatch => {
    if (!token) {
      return Promise.reject("token is missing in parameters");
    }
    return Api(`/auth/verify-email/${token}`, null, {
      method: "get",
      dispatch,
      actionType: actionTypes.REQUEST__EMAIL_VERIFICATION
    });
  };
};

export const authCheckState = data => {
  const { redirect } = data || {};
  return dispatch => {
    const accessToken = localStorage.getItem("a-id");
    const refreshToken = localStorage.getItem("r-id");
    if (!accessToken && !refreshToken) {
      dispatch({ type: actionTypes.RESET_GLOBAL_LOADING });
      return dispatch(logout());
    } else {
      dispatch({ type: actionTypes.SET_GLOBAL_LOADING });
      Api(
        "/auth/validate",
        { accessToken, refreshToken },
        {
          method: "post",
          dispatch,
          actionType: actionTypes.REQUEST__LOGIN
        }
      )
        .then(res => {
          // if (redirect) {
          //   dispatch({ type: actionTypes.SET_AUTH_REDIRECT, redirect });
          // }
          dispatch({ type: actionTypes.RESET_GLOBAL_LOADING });
        })
        .catch(err => dispatch({ type: actionTypes.RESET_GLOBAL_LOADING }));
    }
  };
};

export const setAuthError = error => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_AUTH_ERROR, error });
  };
};
export const setAuthSuccess = error => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_AUTH_SUCCESS, error });
  };
};


export const setAccount = account => {
  return dispatch => {
    dispatch({ type: actionTypes.SET_ACCOUNT, account });
  };
}