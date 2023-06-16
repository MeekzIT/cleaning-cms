import axios from "axios";
import { baseUrl } from "../../config/config";
import { GET_CHOOSE } from "../types";

export const getChooseThunk = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/choose`);
        dispatch({
            type: GET_CHOOSE,
            payload: response.data,
        });
    };
};
