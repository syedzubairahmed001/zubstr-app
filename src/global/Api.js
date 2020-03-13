import axios from "../axios";

const errorAction = action => {
  return "ERROR__" + action.split("__")[1];
};
const successAction = action => {
  return "SUCCESS__" + action.split("__")[1];
};

export default (url, data, config) => {
  const { actionType, dispatch, method, passThrough } = config;
  if (!config || !actionType || !dispatch || !method) {
    return Promise.reject(
      "dispatch or actiontype or method is missing in parameters"
    );
  }
  const d = data ? data : null;
dispatch({type: actionType})
  let sendReq = null;
  switch (method.toLowerCase()) {
    case "post":
      sendReq = axios.post;
      break;
    case "get":
      sendReq = axios.get;
      break;
    case "put":
      sendReq = axios.put;
      break;
    default:
      sendReq = axios.get;
  }
  return sendReq(url, data || null).then(res => {
    console.error(res.headers);
    const data = res.data;
    console.log(res)
    if(data.error){
      dispatch({type: errorAction(actionType), data})
      return Promise.resolve(data);
    }
    const accessToken = res.headers['x-access-token'] || null;
    const refreshToken = res.headers['x-refresh-token'] || null;
    if(accessToken && refreshToken){
      storeTokens(accessToken, refreshToken);
    }
    dispatch({type: successAction(actionType), data})
    return Promise.resolve(data);
  }).catch(err => {
    if(err && err.response && err.response.data){
      dispatch({type: errorAction(actionType), data: err.response.data})
      return Promise.resolve(err.response.data);
    }
    else{
      dispatch({type: errorAction(actionType)})
      dispatch({type: 'ERROR__INTERNET'});
      return Promise.reject('Check your internet connection');
    }
  })
};

const storeTokens = (a, r) => {
  localStorage.setItem("a-id", a);
  localStorage.setItem("r-id", r);
};