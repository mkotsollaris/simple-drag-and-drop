import React from "react";
import { render } from "react-dom";
import SimpleDragAndDrop from "../src/SimpleDragAndDrop";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import App from "../src/App";

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});

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

const names = ["firstname", "lastname", "address"];

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
