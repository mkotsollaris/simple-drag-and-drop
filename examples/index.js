import React from "react";
import axios from "axios";
import { render } from "react-dom";
import SimpleDragAndDrop from "../src/SimpleDragAndDrop";
import { Provider as ReduxProvider } from "react-redux";
import App from "../src/App";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from "../src/reducers";

const initialState = { fields: {} };
const store = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)(createStore)(rootReducer, initialState);

render(
  <ReduxProvider store={store}>
      <App/>
  </ReduxProvider>,
  document.getElementById("root")
);
