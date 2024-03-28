import * as actionTypes from './actionTypes';


const initialState = {
    operator: [],
    crops: []
}

const operatorReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_OPERATOR:
            return {
                ...state,
                operator: [...state.operator, action.payload.operatordata],
            }
        case actionTypes.FETCH_CROPS:
            return {
                ...state,
                crops: action.payload.cropsdata,
            }
            case actionTypes.EDIT_CROP:
            const { id, formData } = action.payload;
            const updatedCrops = state.crops.map(crop => {
                if (crop.id === id) {
                    return { ...crop, ...formData };
                }
                return crop;
            });
            return {
                ...state,
                crops: updatedCrops,
            };
        case actionTypes.FETCH_OPERATOR:
            return {
                ...state,
                operator: action.payload.operatordata,
            }
        case actionTypes.ADD_CROP:
            return {
                ...state,
                crops: [...state.crops, action.payload.operatordata],
            }
        default:
            return state
    }
}


export default operatorReducer;
