import React, { useReducer } from "react";
import { SET_FIELDS } from "./actions/types";

let reducer = (state, action) => {
  switch (action.type) {
    case SET_FIELDS:
      return {
        ...state,
        fields: action.payload
      };
    default:
      return;
  }
};

const initialState = { fields: [] };

const FieldsContext = React.createContext(initialState);

function FieldsProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FieldsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FieldsContext.Provider>
  );
}
export { FieldsContext, FieldsProvider };
