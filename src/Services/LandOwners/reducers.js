import { FETCH_LAND_OWNERS } from './actionTypes';

const initialState = {
    landowners: [],
}

const landOwnerReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_LAND_OWNERS:
            return {
                ...state,
                landowners: action.payload.landowners,
            }
        default:
            return state
    }
}

export default landOwnerReducer;
