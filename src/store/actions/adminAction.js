import {GET_ADMINS, GET_USERS} from "../types";
import axios from "axios";
import {baseUrl, token} from "../../config/config";


export const getAdminsThunk = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/admin`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        dispatch({
            type: GET_ADMINS,
            payload: response.data,
        });
    };
};