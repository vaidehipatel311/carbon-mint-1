import * as actionTypes from './actionTypes';

const initialState = {
    users: []
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
        case actionTypes.UPDATE_USER_STATUS:
            const { status } = action.payload;
            const updatedStatus = state.users.map((user) => {
                if (user.id === action.payload.id) {
                    return { ...user, status }
                }
                return user
            })
            return {
                ...state,
                users: updatedStatus

            };
        default:
            return state
    }
}

export default loginReducer;
