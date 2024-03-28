import * as actionTypes from './actionTypes';

const initialState = {
    landowners: [],
}

const landOwnerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_LAND_OWNER:
            return {
                ...state,
                landowners: [...state.landowners, action.payload.landownerdata],
            }
        case actionTypes.UPDATE_LANDOWNER_STATUS:
            const { id, status } = action.payload;
            const updatedStatus = state.landowners.map((owner) => {
                if (owner.id === id) {
                    return { ...owner, status }
                }
                return owner
            })
            return {
                ...state,
                landowners: updatedStatus

            };
        case actionTypes.EDIT_OWNER:
            const { formData } = action.payload;
            const updatedOwners = state.landowners.map(owner => {
                if (owner.id === action.payload.id) {
                    return { ...owner, ...formData };
                }
                return owner;
            });
            return {
                ...state,
                landowners: updatedOwners,
            };
        case actionTypes.FETCH_LAND_OWNERS:
            return {
                ...state,
                landowners: action.payload.landowners,
            }
        default:
            return state
    }
}

export default landOwnerReducer;
