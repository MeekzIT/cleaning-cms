import axios from "axios";
import { baseUrl } from "../../config/config";
import {GET_DELEVERY_DATA, GET_TERMS_DAT} from "../types";

export const getTermsDataThunk = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/termData`);
        dispatch({
            type: GET_TERMS_DAT,
            payload: response.data,
        });
    };
};

export const getDeleveryDataThunk = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/deleveryData`);
        dispatch({
            type: GET_DELEVERY_DATA,
            payload: response.data,
        });
    };
};
