import * as actionTypes from './actionTypes';

const initialState = {
    users : []
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload.user],
            };
        case actionTypes.FETCH_USER:
            return {
                ...state,
                users: action.payload.userdata
            }
        default:
            return state
    }
}

export default loginReducer;
