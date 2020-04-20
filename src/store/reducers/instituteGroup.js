import * as actionTypes from "../actions/action-types";

const initailState = {
  campuses: {
    count: null,
    data: null,
    isLoading: false,
    shouldLoad: false,
  },
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
      };
    case actionTypes.SET_CAMPUS_SHOULD_LOAD:
      return {
        ...state,
        campuses: {
          ...state.campuses,
          shouldLoad: action.data,
        },
      };
    case actionTypes.REQUEST__GET_CAMPUSES:
      return {
        ...state,
        campuses: {
          ...state.campuses,
          isLoading: true,
        },
      };
    case actionTypes.SUCCESS__GET_CAMPUSES:
      console.log(action);
      return {
        ...state,
        campuses: {
          ...state.campuses,
          isLoading: false,
          data: action.data.data,
        },
      };
    case actionTypes.ERROR__GET_CAMPUSES:
      return {
        ...state,
        campuses: {
          ...state.campuses,
          isLoading: false,
          // data: action.data
        },
      };
    default:
      return state;
  }
};

export default reducer;
