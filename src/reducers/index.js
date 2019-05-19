import { SET_FIELDS } from "../actions/types";

const INTIAL_STATE = {};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case action === SET_FIELDS:
      console.log('@reducer!')
      return {
        ...state,
        fields: action.payload
      };
    default:
      return state;
  }
};