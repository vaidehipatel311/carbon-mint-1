import * as actionTypes from './actionTypes';
import axios from '../../Utils/axios';
import * as urls from '../../Config/urls';


export const addOperator = (formData) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(urls.operatorUrl,
                {
                    "name": formData.name,
                    "co": formData.co,
                    "father_name": formData.father_name,
                    "ownerID": formData.ownerID,
                    "contact_number_2": formData.contact_number_2,
                    "contact_number_1": formData.contact_number_1,
                    "house_no": formData.house_no,
                    "street_name": formData.street_name,
                    "village": formData.village,
                    "block": formData.block,
                    "district": formData.district,
                    "state": formData.state,
                    "country": formData.country,
                    "postal_code": formData.postal_code,
                    "website_addr": formData.website_addr,
                    "email_id": formData.email_id,
                    "aadhar_no": formData.aadhar_no,
                    "unique_id": formData.unique_id,
                    "panCard_id": formData.panCard_id,
                    "edu_qualification": formData.edu_qualification,
                    "passbook_refno": formData.passbook_refno,
                    "total_farming_exp_year": formData.total_farming_exp_year,
                    "organic_farming_exp_year": formData.organic_farming_exp_year,
                    "exp_in_crops": formData.exp_in_crops,
                    "exp_in_livestock": formData.exp_in_livestock,
                    "exp_in_other": formData.exp_in_other,
                    "landparcel_name": formData.landparcel_name,
                    "ownership": formData.ownership,
                    "owner_name": formData.owner_name,
                    "leased_doc_id": formData.leased_doc_id,
                    "survey_no": formData.survey_no,
                    "area": formData.area,
                    "crops":formData.crops
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