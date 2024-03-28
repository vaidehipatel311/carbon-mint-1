import * as actionTypes from './actionTypes';
import axios from '../../Utils/axios';
import * as urls from '../../Config/urls';

export const addLandParcel = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(urls.landParcelsUrl,
                {
                    "SyNo": formData.SyNo,
                    "name": formData.name,
                    "acres": formData.acres,
                    "house_no": formData.house_no,
                    "street_name": formData.street_name,
                    "village": formData.village,
                    "district": formData.district,
                    "state": formData.state,
                    "country": formData.country,
                    "postal_code": formData.postal_code,
                    "contact_number_1": formData.contact_number_1,
                    "area_owned": formData.area_owned,
                    "area_leased": formData.area_leased,
                    "neighbouring_farm": formData.neighbouring_farm,
                    "farming_system": formData.farming_system,
                    "infrastructure": formData.infrastructure,
                    "water_resources": formData.water_resources,
                    "crops": formData.crops,
                    "status": formData.status
                });
            dispatch({
                type: actionTypes.ADD_LAND_PARCEL,
                payload: { landparceldata: { formData, id: response.data.id } },
            })
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};
export const editParcel = (id, formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(urls.landParcelsUrl + `/${id}`, formData);
            dispatch({
                type: actionTypes.EDIT_PARCEL,
                payload: { id, formData: response.data },
            });
        } catch (error) {
            console.error('Error editing parcel:', error);
        }
    };
};
export const updateLandParcelStatus = (id,status) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(urls.landParcelsUrl + `/${id}`, { 
                status
            });

            dispatch({ type: actionTypes.UPDATE_LANDPARCEL_STATUS, payload: { id, status} });
        } catch (error) {
            console.error('Error updating landowner status:', error);
        }
    };
};
export const fetchLandParcel = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.landParcelsUrl);
            const landparcels = response.data
            dispatch({
                type: actionTypes.FETCH_LAND_PARCELS,
                payload: { landparcels },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};