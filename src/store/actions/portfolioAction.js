import axios from "axios";
import { GET_PORTFOLIO_IMAGES, GET_PORTFOLIO_VIDEOS } from "../types";
import { baseUrl } from "../../config/config";

export const portfolioGetImagesAC = (page, limit) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/images`, { params: { offset: page, limit: limit } })
      .then(function (response) {
        console.log(response.data);
        dispatch({ type: GET_PORTFOLIO_IMAGES, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export const portfolioGetVideosAC = (page, limit) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/portfolio/video`, {
        params: { offset: page, limit: limit },
      })
      .then(function (response) {
        dispatch({ type: GET_PORTFOLIO_VIDEOS, payload: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
