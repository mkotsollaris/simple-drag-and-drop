import axios from "axios";
import { SET_FIELDS } from "./types";
import * as R from "ramda";

export const getFields = () => async dispatch => {

  // https://48p1r2roz4.sse.codesandbox.io
  // https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test

  

  const endpoint = axios.create({
    baseURL:
      "https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test"
  });

  let onFetchFromAWS = async () => {
    return endpoint.get()
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
