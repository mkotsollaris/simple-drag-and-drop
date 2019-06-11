import axios from "axios";
import { SET_FIELDS } from "./types";
import * as R from "ramda";
import ApolloClient from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

export const getFields = () => async dispatch => {

  // https://48p1r2roz4.sse.codesandbox.io
  // https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test

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

  let onFetchFromAWS = async () => {
    return axiosGitHubGraphQL
      .get("", { query: GET_FIELDS })
  };
  const getFieldsPromise = await onFetchFromAWS();
  const data = getFieldsPromise.data;
 
  const sortByName = R.sortWith([R.ascend(R.prop("name"))]);
  let sortedFieldsByNameResult = sortByName(data);

  dispatch({
    type: SET_FIELDS,
    payload: sortedFieldsByNameResult
  });

  return sortedFieldsByNameResult;
};
