import axios from "axios";
import { SET_FIELDS } from "./types";
import * as R from "ramda";
import ApolloClient from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export const getFields = () => async dispatch => {
  //TODO graphqlClient

  // https://48p1r2roz4.sse.codesandbox.io
  // https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test
  const client = new ApolloClient({
    uri: "https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test"
  });

  const GET_FIELDS = `
  {
    fields(name: "First Name") {
      name
    }
  }
`;

  const axiosGitHubGraphQL = axios.create({
    baseURL:
      "https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test"
  });

  let onFetchFromAWS = () => {
    axiosGitHubGraphQL
      .get("", { query: GET_FIELDS })
      .then(result => console.log("RESULT", result));
  };
  onFetchFromAWS();

  //TODO hook Graphql Here!

  const URL = `https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test`;

  const promiseRes = await axios.get(URL);
  const data = promiseRes.data;

  const sortByName = R.sortWith([R.ascend(R.prop("name"))]);

  let sortedFieldsByNameResult = sortByName(data);

  dispatch({
    type: SET_FIELDS,
    payload: sortedFieldsByNameResult
  });

  return sortedFieldsByNameResult;
};
