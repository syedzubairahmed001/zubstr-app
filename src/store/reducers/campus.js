import * as actionTypes from "../actions/action-types";

const initailState = {
  classes: {},
  requests: {
    student: {
      isLoadedOnce: false,
      data: [],
      isLoading: false,
    },
    teacher: {
      data: [],
      isLoading: false,
    },
  },
};

const reducer = (state = initailState, action) => {
  const { data } = action || {};
  const { error } = data || {};
  const { msg: errorMsg } = error || {};
  const { data: errorData } = error || {};
  switch (action.type) {
    // case actionTypes.LOGOUT:
    //   return {
    //     accessToken: null,
    //     refreshToken: null,
    //     error: null,
    //     isLoading: false,
    //     isAuth: false,
    //     user: null,
    //     redirect: null,
    //     isTrial: false,
    //     account: null,
    //   };
    case actionTypes.REQUEST__STUDENT_ADMISSION_REQUESTS:
      return {
        ...state,
        requests: {
          ...state.requests,
          student: {
            ...state.requests.student,
            isLoading: true,
          },
        },
      };
    case actionTypes.ERROR__STUDENT_ADMISSION_REQUESTS:
      return {
        ...state,
        requests: {
          ...state.requests,
          student: {
            ...state.requests.student,
            isLoading: false,
          },
        },
      };
    case actionTypes.SUCCESS__STUDENT_ADMISSION_REQUESTS:
      return {
        ...state,
        requests: {
          ...state.requests,
          student: {
            ...state.requests.student,
            isLoadedOnce: true,
            data: [...state.requests.student.data, ...data.data],
            isLoading: false,
          },
        },
      };
    case actionTypes.SUCCESS__ACCEPT_STUDENT_ADMISSION_REQUEST:
      if (data.data && data.data.requestId) {
        let newReqArr = state.requests.student.data.filter((e) => {
          return e._id !== data.data.requestId;
        });
        return {
          ...state,
          requests: {
            ...state.requests,
            student: { ...state.requests.student, data: newReqArr },
          },
        };
      }
      return { ...state };
    default:
      return state;
  }
};

export default reducer;
