import { GET_ALL_SUBS, GET_CATEGORY, GET_SUB, GET_WORKERS } from "../types";

const initialState = {
  category: null,
  sub: null,
  allSub: null,
  workers: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case GET_SUB:
      return {
        ...state,
        sub: action.payload,
      };
    case GET_ALL_SUBS:
      return {
        ...state,
        allSub: action.payload,
      };
    case GET_WORKERS:
      return {
        ...state,
        workers: action.payload.paginateData,
      };
    default:
      return state;
  }
};
