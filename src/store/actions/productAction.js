import axios from "axios";
import { baseUrl } from "../../config/config";
import {GET_PRODUCTS, PRODUCT_TEXT_GET} from "../types";

export const getProductsThunk = (offset, limit,search,categoryId) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/product/`, {
      params: {
        offset,
        limit,
        search,
        categoryId
      },
    });
    dispatch({
      type: GET_PRODUCTS,
      payload: response.data,
    });
  };
};

export const getProductsTextThunk = (offset, limit,search) => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/text/`);
    dispatch({
      type: PRODUCT_TEXT_GET,
      payload: response.data,
    });
  };
};
