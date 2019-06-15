import React from "react";
import axios from "axios";
import { render } from "react-dom";
import SimpleDragAndDrop from "../src/SimpleDragAndDrop";
import { Provider as ReduxProvider } from "react-redux";
import App from "../src/App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../src/reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <ReduxProvider store={store}>
      <App />
  </ReduxProvider>,
  document.getElementById("root")
);
