import {GET_DELEVERY_DATA, GET_TERMS_DAT} from "../types";

const initialState = {
    terms: null,
    delevery:null
};

export const jurisReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DELEVERY_DATA:
            return {
                ...state,
                delevery: action.payload,
            };
        case GET_TERMS_DAT:
            return {
                ...state,
                terms: action.payload
            }
        default:
            return state;
    }
};
