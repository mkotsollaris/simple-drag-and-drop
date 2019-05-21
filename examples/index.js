import React from "react";
import axios from "axios";
import { render } from "react-dom";
import SimpleDragAndDrop from "../src/SimpleDragAndDrop";
import ApolloClient from "apollo-boost";
import { Provider as ReduxProvider } from "react-redux";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import App from "../src/App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../src/reducers";

import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

// https://48p1r2roz4.sse.codesandbox.io
// https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test
const client = new ApolloClient({
  uri: "https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test"
});

const GET_ORGANIZATION = `
  {
    fields(name: "First Name") {
      name
    }
  }
`;

const axiosGitHubGraphQL = axios.create({
  baseURL: 'https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test'
});

let onFetchFromAWS = () => {
  axiosGitHubGraphQL
    .get('', { query: GET_ORGANIZATION })
    .then(result => console.log('RESULT',result));
};
onFetchFromAWS();

const store = createStore(rootReducer, applyMiddleware(thunk));

render(
  <ReduxProvider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
