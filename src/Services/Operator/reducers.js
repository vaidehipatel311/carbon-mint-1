import * as actionTypes from './actionTypes';


const initialState = {
    operator: []
}

const operatorReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_OPERATOR:
            return {
                ...state,
                operator: [...state.operator, action.payload.operatordata],
            }
            case actionTypes.FETCH_OPERATOR:
            return {
                ...state,
                operator: action.payload.operatordata,
            }
        default:
            return state
    }
}


export default operatorReducer;
