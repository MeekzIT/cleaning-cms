import axios from "axios";
import { baseUrl, token } from "../../config/config";
import { GET_CALENDAR_DATA, GET_ORDERS } from "../types";

export const getOrdersThunk = (data) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: data,
    });
    dispatch({
      type: GET_ORDERS,
      payload: response.data,
    });
  };
};

export const getCalendarThunk = (data) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        search: {
          status: "new",
        },
      },
    });
    dispatch({
      type: GET_CALENDAR_DATA,
      payload: response.data,
    });
  };
};
