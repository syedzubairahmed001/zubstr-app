import * as actionTypes from "../actions/action-types";

const initailState = {
  accessToken: null,
  refreshToken: null,
  error: null,
  isLoading: false,
  isAuth: false,
  user: null
};

const reducer = (state = initailState, action) => {
  const { data } = action || {};
  const { error } = data || {};
  const { msg: errorMsg } = error || {};
  const { data: errorData } = error || {};
  switch (action.type) {
    case actionTypes.REQUEST__LOGIN:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SUCCESS__LOGIN:
      const { accessToken, refreshToken, user } = data || null;
      return {
        ...state,
        accessToken,
        refreshToken,
        isAuth: true,
        isLoading: false,
        user
      };
    case actionTypes.ERROR__LOGIN:
      localStorage.removeItem("a-id");
      localStorage.removeItem("r-id");
      return {
        ...state,
        error: (error && error.msg) || null,
        isLoading: false,
        isAuth: false,
        user: null
      };
    case actionTypes.REQUEST__SIGNUP:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null
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
              ", please check your inbox")
      };
    case actionTypes.ERROR__SIGNUP:
      return {
        ...state,
        isLoading: false,
        error: errorMsg || null,
        success: null
      };
    case actionTypes.SET_AUTH_ERROR:
      return {
        ...state,
        error: action.error || null,
        success: null
      };
    case actionTypes.SET_AUTH_SUCCESS:
      return {
        ...state,
        success: action.success || null,
        error: null
      };
    case actionTypes.REQUEST__EMAIL_VERIFICATION:
      return {
        ...state,
        success: action.success || null,
        error: null
      };
    default:
      return state;
  }
};

export default reducer;
