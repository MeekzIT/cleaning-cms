import axios from "axios";
import { baseUrl } from "../../config/config";
import { GET_HOME_BANNER, GET_ABOUT_US_BANNER } from "../types";

export const getHomeBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/header`);
    dispatch({
      type: GET_HOME_BANNER,
      payload: response.data,
    });
  };
};

export const getAboutUsBannerThunk = () => {
  return async (dispatch) => {
    const response = await axios.get(`${baseUrl}/videoBanner`);
    dispatch({
      type: GET_ABOUT_US_BANNER,
      payload: response.data[0],
    });
  };
};
