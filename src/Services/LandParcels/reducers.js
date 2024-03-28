import * as actionTypes from './actionTypes';

const initialState = {
    landparcels: []
}

const landParcelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_LAND_PARCEL:
            return {
                ...state,
                landparcels: [...state.landparcels, action.payload.landparceldata],
            }
        case actionTypes.UPDATE_LANDPARCEL_STATUS:
            const { status } = action.payload;
            const updatedStatus = state.landparcels.map((owner) => {
                if (owner.id === action.payload.id) {
                    return { ...owner, status }
                }
                return owner
            })
            return {
                ...state,
                landparcels: updatedStatus

            };
        case actionTypes.EDIT_PARCEL:
            const { id, formData } = action.payload;
            const updatedParcels = state.landparcels.map(parcel => {
                if (parcel.id === id) {
                    return { ...parcel, ...formData };
                }
                return parcel;
            });
            return {
                ...state,
                landparcels: updatedParcels,
            };
        case actionTypes.FETCH_LAND_PARCELS:
            return {
                ...state,
                landparcels: action.payload.landparcels,
            }
        default:
            return state
    }
}

export default landParcelReducer;
