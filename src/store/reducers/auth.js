import * as actionTypes from '../actions/action-types';

const initailState = {
    accessToken: null,
    refreshToken: null,
    error: null,
    loading: false,
    isAuth: false
}

const reducer = (state = initailState, action) => {
    switch(action.type) {
        case actionTypes.REQUEST_LOGIN: return {
            ...state,
            loading: true
        }
        case actionTypes.SUCCESS_LOGIN: return {
            ...state,
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
            isAuth: true,
            loading: false
        }
        case actionTypes.ERROR_LOGIN: return {
            ...state,
            error: action.error,
            loading: false
        }
        default:
            return state;
    }
}

export default reducer;