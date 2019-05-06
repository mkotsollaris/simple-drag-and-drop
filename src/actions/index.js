import axios from 'axios';

export const getFields = graphqlClient => async (dispatch) => {
    //TODO graphqlClient 
    console.log('LMAO!')
    const URL = `https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test`;
    const promise = await axios.get(URL);
      console.log('PROMISE;',promise);
    
  
    // dispatch({
    //   type: GET_COUNTRIES,
    //   payload: JSON.parse(promise.data.response).sort(),
    // });
  };