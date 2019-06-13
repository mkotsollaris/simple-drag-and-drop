import React from "react";
import axios from "axios";
import { render } from "react-dom";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import SimpleDragAndDrop from "../src/SimpleDragAndDrop";
import ApolloClient from "apollo-boost";
import { Provider as ReduxProvider } from "react-redux";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import App from "../src/App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../src/reducers";


const client = new ApolloClient();
const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <ReduxProvider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
