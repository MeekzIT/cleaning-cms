import {GET_PORTFOLIO_IMAGES, GET_PORTFOLIO_VIDEOS} from "../types";


const initialState = {
    images:null,
    imagesCount:null,
    videos:null,
    videosCount:null
};

export const portfolioReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PORTFOLIO_IMAGES:
            return {
                ...state,
                images: action.payload.paginateData,
                imagesCount: action.payload.count
            }
        case GET_PORTFOLIO_VIDEOS:
            return {
                ...state,
                videos: action.payload.videos,
                videosCount: action.payload.count
            }
        default:
            return state;
    }
};