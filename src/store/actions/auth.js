import axios from "../../axios";
import * as actionTypes from "./action-types";
import Api from "../../global/Api";

const storeTokens = (a, r) => {
  localStorage.setItem("a-id", a);
  localStorage.setItem("r-id", r);
};
export const requestLogin = () => ({
  type: actionTypes.REQUEST__LOGIN
});

export const succesLogin = (accessToken, refreshToken, user) => ({
  type: actionTypes.SUCCESS__LOGIN,
  data: { accessToken, refreshToken, user }
});
export const errorLogin = error => ({
  type: actionTypes.ERROR__LOGIN,
  error
});
export const logout = () => {
  localStorage.removeItem("a-id");
  localStorage.removeItem("r-id");

  return {
    type: actionTypes.LOGOUT
  };
};
export const requestSignup = () => ({
  type: actionTypes.REQUEST__SIGNUP
});
export const successSignup = success => ({
  type: actionTypes.SUCCESS__SIGNUP,
  success
});
export const errorSignup = error => ({
  type: actionTypes.ERROR__SIGNUP,
  error
});

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

export const verifyEmail = (data) => {
  const {token} = data || null;
  return dispatch => {
    if(!token) {
      return Promise.reject('token is missing in parameters');
    }
    return Api(`/auth/verify-email/${token}`, null, {
      method: 'get',
      dispatch,
      actionType: actionTypes.REQUEST__EMAIL_VERIFICATION
    })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const accessToken = localStorage.getItem("a-id");
    const refreshToken = localStorage.getItem("r-id");
    if (!accessToken && !refreshToken) {
      return dispatch(logout());
    } else {
      Api('/auth/validate', null , {
        method: 'post',
        dispatch,
        actionType: actionTypes.REQUEST__LOGIN
      })
      // axios
      //   .post("/auth/validate", {
      //     accessToken,
      //     refreshToken
      //   })
      //   .then(res => {
      //     const { data } = res;
      //     const { accessToken, refreshToken, user } = data;

      //     if (accessToken && refreshToken && user) {
      //       storeTokens(accessToken, refreshToken);
      //       dispatch(succesLogin(accessToken, refreshToken, user  ));
      //     } else {
      //       dispatch(logout());
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
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
