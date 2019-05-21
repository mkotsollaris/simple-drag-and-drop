import axios from "axios";
import { GET_FIELDS, SET_FIELDS } from "./types";
import * as R from 'ramda';
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";

export const getFields = graphqlClient => async dispatch => {
  //TODO graphqlClient
  console.log("graphql!");
  const URL = `https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test`;
  const promiseRes = await axios.get(URL);
  const data = promiseRes.data;

  const sortByName = R.sortWith([
    R.ascend(R.prop('name'))
  ]);
  
  let sortedFieldsByNameResult = sortByName(data);

  

  dispatch({
    type: SET_FIELDS,
    payload: sortedFieldsByNameResult
  });
  return sortedFieldsByNameResult;
};
