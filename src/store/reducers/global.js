import * as actionTypes from '../actions/action-types';

const initailState = {
    error: null,
    success: null
}

const reducer = (state = initailState, action) => {
    const {data} = action || {};
    switch(action.type) {
        case actionTypes.REQUEST__LOGIN: return {
            ...state,
            isLoading: true
        }
        case actionTypes.SUCCESS__LOGIN:
        const {accessToken, refreshToken, user} = data || null  
        return {
            ...state,
            accessToken,
            refreshToken,
            isAuth: true,
            isLoading: false,
            user
        }
        case actionTypes.ERROR__LOGIN:
            const {error} = data || null 
        return {
            ...state,
            error: error.msg || null,
            isLoading: false,
            isAuth: false,
            user: null
        }
        case actionTypes.REQUEST__SIGNUP: return {
            ...state,
            isLoading: true,
            error: null,
            success: null
        }
        case actionTypes.SUCCESS__SIGNUP:
        return {
            ...state,
            isLoading: false,
            error: null,
            success: data.success || (data.account && 'A verification email has sent to ' + data.account.email + ', please check your inbox'),
        }
        case actionTypes.ERROR__SIGNUP:
             return {
            ...state,
            isLoading: false,
            error: data.error.msg || null,
            success: null
        }
        case actionTypes.SET_AUTH_ERROR: return {
            ...state,
            error: action.error || null,
            success: null
        }
        case actionTypes.SET_AUTH_SUCCESS: return {
            ...state,
            success: action.success || null,
            error: null,
        }
        default:
            return state;
    }
}

export default reducer;