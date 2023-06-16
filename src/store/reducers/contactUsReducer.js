import { GET_CONTACTS } from "../types";

const initialState = {
  contacts: null,
  count:null
};

export const contactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload.posts,
        count:action.payload.count
      };
    default:
      return state;
  }
};
