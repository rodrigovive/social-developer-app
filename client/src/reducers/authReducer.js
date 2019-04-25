import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "lodash/isEmpty";
const initialState = {
  isAuthenticate: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER: {
      return {
        ...state,
        isAuthenticate: !isEmpty(action.payload),
        user: action.payload
      };
    }
    default:
      return state;
  }
}
