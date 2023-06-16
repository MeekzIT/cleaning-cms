import { GET_USERS,USER_HISTORY } from "../types"

const initialState = {
    users:null,
    count:null,
    history:null 
}


export const usersReducer = (state=initialState,action) => {
    switch (action.type){
        case GET_USERS:
            return {
                ...state,
                users:action.payload.paginateData,
                count:action.payload.count
            }
        case USER_HISTORY : 
        return {
            ...state,
            history:action.payload
        }
        default:
            return state
    }
}