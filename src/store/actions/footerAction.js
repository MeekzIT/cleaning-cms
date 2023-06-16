import axios from "axios";
import { baseUrl } from "../../config/config";
import { GET_HOME_FOOTER,GET_ABOUT_FOOTER,GET_PRODUCT_FOOTER ,GET_DETAIL_FOOTER} from "../types";


export const getHomeFooterThunk = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/homeFooter`);
        dispatch({
            type: GET_HOME_FOOTER,
            payload: response.data[0],
        });
    };
};


export const getDetailFooterThunk = () => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/detailFooter`);
        dispatch({
            type: GET_DETAIL_FOOTER,
            payload: response.data[0],
        });
    };
}
