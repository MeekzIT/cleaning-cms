import { GET_CALENDAR_DATA, GET_ORDERS } from "../types";

const initialState = {
  orders: null,
  count: null,
  calendar: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload.paginateData,
        count: action.payload.count,
      };
    case GET_CALENDAR_DATA:
      return {
        ...state,
        calendar: action.payload.paginateData,
      };
    default:
      return state;
  }
};
