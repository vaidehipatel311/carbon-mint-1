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
            case actionTypes.EDIT_EVENT:
                const { id, formData } = action.payload;
                const updatedEvents = state.events.map(event => {
                    if (event.id === id) {
                        return { ...event, ...formData };
                    }
                    return event;
                });
                return {
                    ...state,
                    events: updatedEvents,
                };
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
