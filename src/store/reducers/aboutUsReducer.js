import { GET_ABOUT_US, GET_ABOUT_US_INFO } from "../types"

const initialState = {
    aboutUs:[],
    aboutUsInfo:[]
}


export const aboutUsReducer = (state=initialState,action) => {
    switch (action.type){
        case GET_ABOUT_US:
            return {
                ...state,
                aboutUs:action.payload
            }
            case GET_ABOUT_US_INFO:
                return {
                    ...state,
                    aboutUsInfo:action.payload
                }
        default:
            return state
    }
}