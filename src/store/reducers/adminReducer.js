import {CHANGE_AUTH, GET_ADMINS} from "../types"

const initialState = {
    admins:null
}


export const AdminReducer = (state=initialState,action) => {
    switch (action.type){
        case GET_ADMINS:
            return {
                ...state,
                admins:action.payload
            }
        default:
            return state
    }
}