import * as action from './actionTypes';
import axios from '../../Utils/axios';
import * as urls from '../../Config/urls';

export const fetchLandOwners = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.landOwnersUrl);
            const landowners = response.data
            dispatch({
                type: action.FETCH_LAND_OWNERS,
                payload: { landowners },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};