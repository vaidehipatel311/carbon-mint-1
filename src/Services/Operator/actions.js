import * as actionTypes from './actionTypes';
import axios from '../../Utils/axios';
import * as urls from '../../Config/urls';


export const addOperator = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(urls.operatorUrl,
                {
                    "name": formData.name,
                    "family_size": formData.family_size,
                    "father_name": formData.father_name,
                    "ownerID": formData.ownerID,
                    "contact_number_2": formData.contact_number_2,
                    "contact_number_1": formData.contact_number_1,
                    "house_no": formData.house_no,
                    "street_name": formData.street_name,
                    "village": formData.village,
                    "district": formData.district,
                    "state": formData.state,
                    "country": formData.country,
                    "postal_code": formData.postal_code,
                    "email_id": formData.email_id,
                    "aadhar_no": formData.aadhar_no,
                    "unique_id": formData.unique_id,
                    "panCard_id": formData.panCard_id,
                    "edu_qualification": formData.edu_qualification,
                    "passbook_refno": formData.passbook_refno,
                    "total_farming_exp_year": formData.total_farming_exp_year,
                    "organic_farming_exp_year": formData.organic_farming_exp_year,
                    "landparcel_name": formData.landparcel_name,
                    "total_landparcels": formData.total_landparcels,
                    "owner_name": formData.owner_name,
                    "leased_doc_id": formData.leased_doc_id,
                    "total_crops": formData.total_crops,
                    "area": formData.area,
                    "crops": formData.crops,
                    "status":"Pending"
                });
            dispatch({
                type: actionTypes.ADD_OPERATOR,
                payload: { operatordata: { formData, id: response.data.id } },
            })
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};
export const editOperator = (id, formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(urls.operatorUrl + `/${id}`, formData);
            dispatch({
                type: actionTypes.EDIT_OPERATOR,
                payload: { id, formData: response.data },
            });
        } catch (error) {
            console.error('Error editing parcel:', error);
        }
    };
};
export const fetchOperator = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.operatorUrl);
            const operatordata = response.data
            dispatch({
                type: actionTypes.FETCH_OPERATOR,
                payload: { operatordata },
            })
            return response.data
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};

export const addCrops = (formData,landparcelID) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(urls.cropsUrl,
                {
                    "landparcel_id":landparcelID,
                    "crop_name": formData.crop_name,
                    "landparcel_name": formData.landparcel_name,
                    "acres": formData.acres,
                    "area_owned": formData.area_owned,
                    "crop_age": formData.crop_age,
                    "cropping_systems": formData.cropping_systems,
                    "water_resources": formData.water_resources,
                    "water_sample_test": formData.water_sample_test,
                    "irrigation_status": formData.irrigation_status

                });

            dispatch({
                type: actionTypes.ADD_CROP,
                payload: { operatordata: { formData, id: response.data.id } },
            })
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};

export const editCrop = (id, formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(urls.cropsUrl + `/${id}`, formData);
            dispatch({
                type: actionTypes.EDIT_CROP,
                payload: { id, formData: response.data },
            });
        } catch (error) {
            console.error('Error editing parcel:', error);
        }
    };
};

export const fetchCrops = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.cropsUrl);
            const cropsdata = response.data
            dispatch({
                type: actionTypes.FETCH_CROPS,
                payload: { cropsdata },
            })
            return response.data
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};

export const addLandparcel = (formData,opid) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(urls.addLandparcelUrl,
                {
                    "operator_id":opid,
                    "landparcel_name": formData.landparcel_name,
                    "house_no": formData.house_no,
                    "village": formData.village,
                    "district": formData.district,
                    "state": formData.state,
                    "country": formData.country,
                    "postal_code": formData.postal_code,
                    "acres": formData.acres,
                    "area_owned": formData.area_owned,
                    "area_leased": formData.area_leased,
                    "SyNo": formData.SyNo,
                    "neighbouring_farm": formData.neighbouring_farm,
                    "distance": formData.distance,
                    "land_under_cultivation": formData.land_under_cultivation,
                    "cropping_systems": formData.cropping_systems,
                    "farming_system": formData.farming_system,
                    "infrastructure": formData.infrastructure,
                    "water_resources": formData.water_resources

                });

            dispatch({
                type: actionTypes.ADD_LANDPARCEL,
                payload: { landparceldata: { formData, id: response.data.id } },
            })
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};

export const editLandparcel = (id, formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(urls.addLandparcelUrl + `/${id}`, formData);
            dispatch({
                type: actionTypes.EDIT_LANDPARCEL,
                payload: { id, formData: response.data },
            });
        } catch (error) {
            console.error('Error editing parcel:', error);
        }
    };
};

export const fetchLandparcels = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.addLandparcelUrl);
            const addLandparceldata = response.data
            dispatch({
                type: actionTypes.FETCH_LANDPARCEL,
                payload: { addLandparceldata },
            })
            return response.data
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};

export const updateOperatorStatus = (id,status) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(urls.operatorUrl + `/${id}`, { 
                status
            });

            dispatch({ type: actionTypes.UPDATE_OPERATOR_STATUS, payload: { id, status} });
        } catch (error) {
            console.error('Error updating landowner status:', error);
        }
    };
};
