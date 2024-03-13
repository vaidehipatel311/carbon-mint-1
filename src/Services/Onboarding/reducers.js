import * as actionTypes from './actionTypes';


const initialState = {
    onboarding: []
}

const onboardingReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ONBOARDING:
            return {
                ...state,
                onboarding: action.payload.onboardingdata,
            }
        
        default:
            return state
    }
}


export default onboardingReducer;
