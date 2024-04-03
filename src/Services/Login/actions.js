import * as actionTypes from './actionTypes'
import axios from '../../Utils/axios';
import * as urls from '../../Config/urls';

export const addUser = (phoneNo,otp) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(urls.usersUrl,{phoneNo,otp});
            dispatch({
                type: actionTypes.ADD_USER,
                payload: { user : {phoneNo , id:response.data.id, otp : otp} },
            })
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};

export const fetchUser = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(urls.usersUrl);
            const userdata = response.data.slice(1);
            dispatch({
                type: actionTypes.FETCH_USER,
                payload: { userdata},
            })
            return userdata;
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
};

export const updateUserStatus = (id, status) => {
    return async (dispatch) => {
        try {
            const response = await axios.patch(urls.usersUrl + `/${id}`, {
                status
            });
            console.log(id, status);

            dispatch({ type: actionTypes.UPDATE_USER_STATUS, payload: { id, status } });
        } catch (error) {
            console.error('Error updating landowner status:', error);
        }
    };
};