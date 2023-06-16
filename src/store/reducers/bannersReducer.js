import {
    GET_HOME_BANNER,
    GET_ABOUT_US_BANNER,
} from "../types";

const initialState = {
    homeBanner: null,
    aboutBanner: null,
};

export const bannersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOME_BANNER:
            return {
                ...state,
                homeBanner: action.payload,
            };
        case GET_ABOUT_US_BANNER:
            return {
                ...state,
                aboutBanner: action.payload,
            };
        default:
            return state;
    }
};
