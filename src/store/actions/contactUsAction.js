import axios from "axios";
import { baseUrl, token } from "../../config/config";
import { GET_CONTACTS } from "../types";

export const getContactsThunk = (offset, limit) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/contactUs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset,
        limit,
      },
    });
    dispatch({
      type: GET_CONTACTS,
      payload: response.data,
    });
  };
};
