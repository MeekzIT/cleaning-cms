import {GET_DELEVERY} from "../types";

const initialState = {
    deleveryValues: null
};

export const deleveryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DELEVERY:
            return {
                ...state,
                deleveryValues: action.payload,
            };
        default:
            return state;
    }
};
