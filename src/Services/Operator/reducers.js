import * as actionTypes from './actionTypes';


const initialState = {
    operator: [],
    crops: [],
    landparcel: [],
    maps: []
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

        case actionTypes.ADD_CROP:
            return {
                ...state,
                crops: [...state.crops, action.payload.operatordata],
            }

        case actionTypes.UPDATE_OPERATOR_STATUS:
            const { status } = action.payload;
            const updatedStatus = state.operator.map((owner) => {
                if (owner.id === action.payload.id) {
                    return { ...owner, status }
                }
                return owner
            })
            return {
                ...state,
                operator: updatedStatus

            };

        case actionTypes.EDIT_OPERATOR:
            const updatedOperators = state.operator.map(op => {
                if (op.id === action.payload.id) {
                    return { ...op, ...action.payload.formData };
                }
                return op;
            });
            return {
                ...state,
                operator: updatedOperators,
            };

        case actionTypes.FETCH_MAPS:
            return {
                ...state,
                maps: action.payload.mapsdata,
            }
        default:
            return state
    }
}


export default operatorReducer;
