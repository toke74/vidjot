// import { GET_ERRORS, GET_IDEA, SET_CURRENT_USER } from "./types";

import {
  GET_IDEA,
  IDEA_LOADING

  // CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  ideas: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IDEA_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_IDEA:
      return {
        ...state,
        ideas: action.payload,
        loading: false
      };
    // case CLEAR_CURRENT_PROFILE:
    //   return {
    //     ...state,
    //     profile: null
    //   };
    default:
      return state;
  }
}
