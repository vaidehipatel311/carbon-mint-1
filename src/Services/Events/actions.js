import * as actionTypes from './actionTypes';
import axios from '../../Utils/axios';
import * as urls from '../../Config/urls';

export const addEvent = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(urls.addEventsUrl,
                {
                    "seedlings": formData.seedlings,
                    "nursery": formData.nursery,
                    "nursery_bed": formData.nursery_bed,
                    "house": formData.house,
                    "soil_treatment": formData.soil_treatment,
                    "chemicals": formData.chemicals,
                    "quantity": formData.quantity,
                    "seed_treatment": formData.seed_treatment,
                    "variety": formData.variety,
                    "crop_duration": formData.crop_duration,
                    "seed_rate": formData.seed_rate,
                    "sowing_method": formData.sowing_method,
                    "irrigation_method": formData.irrigation_method,
                    "intercultural_operations": formData.intercultural_operations,
                    "recommended_competent": formData.recommended_competent,
                    'scarcification': formData.scarcification,
                    'soaking_hot_water': formData.soaking_hot_water,
                    'soaking_chemicals': formData.soaking_chemicals,
                    'soaking_cool_water': formData.soaking_cool_water,
                    'wetting_drying': formData.wetting_drying,
                    'others': formData.others,
                    "evidence": formData.evidence
                });
            dispatch({
                type: actionTypes.ADD_EVENTS,
                payload: { eventdata: { formData, id: response.data.id } },
            })
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};

export const fetchEvents = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.eventsUrl);
            const events = response.data
            dispatch({
                type: actionTypes.FETCH_EVENTS,
                payload: { events },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };
};

export const fetchAddedEvents = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.addEventsUrl);
            const events = response.data
            dispatch({
                type: actionTypes.FETCH_ADDED_EVENTS,
                payload: { events },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };
};