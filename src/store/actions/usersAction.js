import axios from "axios";
import { baseUrl, token } from "../../config/config";
import { GET_USERS, USER_HISTORY } from "../types";

export const getUsers = (offset, limit,search) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        offset,
        limit,
        search
      },
    });
    dispatch({
      type: GET_USERS,
      payload: response.data,
    });
  };
};

export const getUserHistory = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/users/history`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
       id
      },
    });
    dispatch({
      type: USER_HISTORY,
      payload: response.data,
    });
  };
};
