import React from "react";
import { ApolloConsumer } from "react-apollo";

const WithApolloClient = () => (
  <ApolloConsumer>
    {client => "We have access to the client!" /* do stuff here */}
  </ApolloConsumer>
);
