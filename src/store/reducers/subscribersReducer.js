import { GET_SUBSCRIBERS } from "../types";

const initialState = {
  subscribers: null,
  count: null,
};

export const subscribersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBSCRIBERS:
      return {
        ...state,
        subscribers: action.payload.subscribers,
        count: action.payload.count,
      };
    default:
      return state;
  }
};
