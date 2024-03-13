import * as actionTypes from './actionTypes';
import axios from '../../Utils/axios';
import * as urls from '../../Config/urls';

export const fetchOnboarding = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.onboardingUrl);
            const onboardingdata = response.data
            dispatch({
                type: actionTypes.FETCH_ONBOARDING,
                payload: { onboardingdata },
            })
            return response.data
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};

