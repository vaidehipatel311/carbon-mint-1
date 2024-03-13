import * as action from './actionTypes';
import axios from '../../Utils/axios';
import * as urls from '../../Config/urls';

export const fetchLandParcels = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.landParcelsUrl);
            const landparcels = response.data
            dispatch({
                type: action.FETCH_LAND_PARCELS,
                payload: { landparcels },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};