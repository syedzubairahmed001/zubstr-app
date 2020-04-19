import * as actionTypes from "../actions/action-types";

const initailState = {
  accessToken: null,
  refreshToken: null,
  error: null,
  isLoading: false,
  isAuth: false,
  user: null,
  redirect: null,
  isTrial: false,
  account: null,
  accounts: null
};

const reducer = (state = initailState, action) => {
  const { data } = action || {};
  const { error } = data || {};
  const { msg: errorMsg } = error || {};
  const { data: errorData } = error || {};
  switch (action.type) {
    case actionTypes.LOGOUT:
      return {
        accessToken: null,
        refreshToken: null,
        error: null,
        isLoading: false,
        isAuth: false,
        user: null,
        redirect: null,
        isTrial: false,
        account: null,
      };

    case actionTypes.REQUEST__LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SUCCESS__LOGIN:
      const { accessToken, refreshToken, user } = data || null;
      const isTrial = user.subscription && user.subscription.isTrial;
      return {
        ...state,
        accessToken,
        refreshToken,
        isAuth: true,
        isLoading: false,
        user,
        isTrial,
      };
    case actionTypes.ERROR__LOGIN:
      localStorage.removeItem("a-id");
      localStorage.removeItem("r-id");
      return {
        ...state,
        error: (error && error.msg) || null,
        isLoading: false,
        isAuth: false,
        user: null,
      };
    case actionTypes.REQUEST__SIGNUP:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };
    case actionTypes.SUCCESS__SIGNUP:
      return {
        ...state,
        isLoading: false,
        error: null,
        success:
          data.success ||
          (data.account &&
            "A verification email has sent to " +
              data.account.email +
              ", please check your inbox"),
      };
    case actionTypes.ERROR__SIGNUP:
      return {
        ...state,
        isLoading: false,
        error: errorMsg || null,
        success: null,
      };
    case actionTypes.SET_AUTH_ERROR:
      return {
        ...state,
        error: action.error || null,
        success: null,
      };
    case actionTypes.SET_AUTH_SUCCESS:
      return {
        ...state,
        success: action.success || null,
        error: null,
      };
    case actionTypes.REQUEST__EMAIL_VERIFICATION:
      return {
        ...state,
        success: action.success || null,
        error: null,
      };
    case actionTypes.SET_AUTH_REDIRECT:
      return {
        ...state,
        redirect: action.redirect,
      };
    case actionTypes.SET_ACCOUNT:
      return {
        ...state,
        account: action.account,
      };
    case actionTypes.REQUEST__ACCOUNT:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SUCCESS__ACCOUNT:
      return {
        ...state,
        account: data.account,
        isLoading: false,
      };
    case actionTypes.ERROR__ACCOUNT:
      localStorage.removeItem("current-acc-type");
      localStorage.removeItem("current-acc-id");
      return {
        ...state,
        account: null,
        isLoading: false,
      };
    case actionTypes.SUCCESS__ACCOUNTS:
      return {
        ...state,
        accounts: data.data
      };
    default:
      return state;
  }
};

export default reducer;
