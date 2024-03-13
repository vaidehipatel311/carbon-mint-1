import * as actionTypes from './actionTypes';

const initialState = {
    events: [],
}

const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_EVENTS:
            return {
                ...state,
                events: [...state.events, action.payload.eventdata],
            }

        case actionTypes.FETCH_EVENTS:
            return {
                ...state,
                events: action.payload.events,
            }
        case actionTypes.FETCH_ADDED_EVENTS:
            return {
                ...state,
                events: action.payload.events,
            }
        default:
            return state
    }
}

export default eventReducer;
