import {baseUrl} from "../../config/config";
import {GET_SINGLE_VIDEO, GET_VIDEOS} from "../types";
import axios from "axios"

export const getVideosThunk = (offset, limit,search) => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/video/`, {
            params: {
                offset,
                limit,
                search
            },
        });
        dispatch({
            type: GET_VIDEOS,
            payload: response.data,
        });
    };
};

export const getSingleVideosThunk = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`${baseUrl}/video/single`, {
            params: {
                id
            },
        });
        dispatch({
            type: GET_SINGLE_VIDEO,
            payload: response.data,
        });
    };
};