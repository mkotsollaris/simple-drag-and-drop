import axios from "axios";
import { SET_FIELDS } from "./types";
import * as R from "ramda";

export const getFields = () => async dispatch => {
  //TODO graphqlClient

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
