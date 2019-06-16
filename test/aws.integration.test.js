import axios from 'axios';

it('endpoint works', async (done) => {
  const endpoint = 'https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test';
  const response = await makeRequest(endpoint); 
  expect(response).toBeTruthy();
  expect.assertions(1);
  done();
});

it('endpoint works', async (done) => {
  const endpoint = 'https://870m93mis4.execute-api.us-west-2.amazonaws.com/default/Test';
  const response = await makeRequest(endpoint); 
  expect(response).toBeTruthy();
  expect.assertions(1);
  done();
});

const makeRequest = async (endpointURL) => {
    try {
      const response = await axios.get(endpointURL);
      return response;
    } catch (err) {
      return false;
    }
  };