import { FETCH_LAND_PARCELS } from './actionTypes';

const initialState = {
    landparcels : []
}

const landParcelReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_LAND_PARCELS:
            return {
                ...state,
                landparcels: action.payload.landparcels,
            }
        default:
            return state
    }
}

export default landParcelReducer;
