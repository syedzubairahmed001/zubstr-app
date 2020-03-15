import * as actionTypes from '../actions/action-types';

const initailState = {
    isLoading: false
}

const reducer = (state = initailState, action) => {
    const {data} = action || {};
    switch(action.type) {
        case actionTypes.SET_GLOBAL_LOADING: return {
            ...state,
            isLoading: true
        }
        case actionTypes.RESET_GLOBAL_LOADING: return {
            ...state,
            isLoading: false
        }
        default:
            return state;
    }
}

export default reducer;