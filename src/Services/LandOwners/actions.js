import * as actionTypes from './actionTypes';
import axios from '../../Utils/axios';
import * as urls from '../../Config/urls';

export const addLandOwner = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(urls.landOwnersUrl,
                {
                    "name": formData.name,
                    "father_name": formData.father_name,
                    "ownerID": formData.ownerID,
                    "contact_number_1": formData.contact_number_1,
                    "house_no": formData.house_no,
                    "village": formData.village,
                    "district": formData.district,
                    "state": formData.state,
                    "country": formData.country,
                    "postal_code": formData.postal_code,
                    "email_id": formData.email_id,
                    "aadhar_no": formData.aadhar_no,
                    "unique_id": formData.unique_id,
                    "passbook_refno": formData.passbook_refno,
                    "total_farming_exp_year": formData.total_farming_exp_year,
                    "organic_farming_exp_year": formData.organic_farming_exp_year,
                    "landparcels": formData.landparcels,
                    "area": formData.area,
                    "acres":formData.acres,
                    "crops": formData.crops,
                    "status": formData.status
                });
            dispatch({
                type: actionTypes.ADD_LAND_OWNER,
                payload: { landownerdata: { formData, id: response.data.id } },
            })
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};
export const editOwner = (id, formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(urls.landOwnersUrl + `/${id}`, formData);
            dispatch({
                type: actionTypes.EDIT_OWNER,
                payload: { id, formData: response.data },
            });
        } catch (error) {
            console.error('Error editing owner:', error);
        }
    };
};
export const updateLandOwnerStatus = (id,status) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(urls.landOwnersUrl + `/${id}`, { 
                status
            });

            dispatch({ type: actionTypes.UPDATE_LANDOWNER_STATUS, payload: { id, status} });
        } catch (error) {
            console.error('Error updating landowner status:', error);
        }
    };
};


export const fetchLandOwners = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.landOwnersUrl);
            const landowners = response.data
            dispatch({
                type: actionTypes.FETCH_LAND_OWNERS,
                payload: { landowners },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};