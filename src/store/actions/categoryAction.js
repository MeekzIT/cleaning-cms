import axios from "axios";
import { baseUrl, token } from "../../config/config";
import { GET_ALL_SUBS, GET_CATEGORY, GET_SUB, GET_WORKERS } from "../types";

export const getCategoryThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/category`);
    dispatch({
      type: GET_CATEGORY,
      payload: response.data,
    });
  };
};

export const getSubCategoryThunk = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/subCategory/single`, {
      params: { id },
    });
    dispatch({
      type: GET_SUB,
      payload: response.data,
    });
  };
};

export const getAllSubCategoryThunk = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/subCategory`);
    dispatch({
      type: GET_ALL_SUBS,
      payload: response.data,
    });
  };
};

export const getWorkersThunk = (id) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/workers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: GET_WORKERS,
      payload: response.data,
    });
  };
};
