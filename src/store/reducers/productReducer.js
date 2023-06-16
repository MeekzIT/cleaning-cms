import {GET_PRODUCTS, PRODUCT_TEXT_GET} from "../types"


const initialState = {
    products: null,
    count: null,
    text: null
};

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                count: action.payload.count,
            };
        case PRODUCT_TEXT_GET:
            return {
                ...state,
                text: action.payload
            }
        default:
            return state;
    }
};