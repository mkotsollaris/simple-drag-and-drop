import React from "react";
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

// 
// https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test
const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

const store = createStore(rootReducer, applyMiddleware(thunk));

client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `
  })
  .then(result => console.log(result));

render(
  <ReduxProvider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </ReduxProvider>,
  document.getElementById("root")
);
