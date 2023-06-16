import { GET_CHOOSE } from "../types";

const initialState = {
    chooseData: null,
};

export const chooseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHOOSE:
            return {
                ...state,
                chooseData: action.payload,
            };
        default:
            return state;
    }
};
