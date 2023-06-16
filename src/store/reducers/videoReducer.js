import {GET_SINGLE_VIDEO, GET_VIDEOS} from "../types"

const initialState = {
    videos:null,
    count:null,
    loading:true,
    single:null,
    singleLoading:true
}


export const videoReducer = (state=initialState,action) => {
    switch (action.type){
        case GET_VIDEOS:
            return {
                ...state,
                videos: action.payload.videos,
                count: action.payload.count,
                loading: false
            }
        case GET_SINGLE_VIDEO:
            return {
                ...state,
                single: action.payload,
                singleLoading: false
            }
        default:
            return state
    }
}