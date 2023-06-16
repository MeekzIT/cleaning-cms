import { CHANGE_AUTH } from "../types"

const initialState = {
    isAuth:false
}


export const isAuthReducer = (state=initialState,action) => {
    switch (action.type){
        case CHANGE_AUTH:
            return {
                ...state,
                isAuth:action.payload
            }
        default:
            return state
    }
}