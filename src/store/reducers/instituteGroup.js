import * as actionTypes from "../actions/action-types";

const initailState = {
  campus: {
    count: null,
    data: null,
    isLoading: false
  }
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
    default:
      return state;
  }
};

export default reducer;
