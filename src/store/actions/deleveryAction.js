import axios from "axios";
import {baseUrl} from "../../config/config";
import {GET_DELEVERY} from "../types";

export const getDeleveryThunk = (offset, limit) => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/deleveryValue`);
        dispatch({
            type: GET_DELEVERY,
            payload: response.data,
        });
    };
};
