import axios from 'axios';

import config from '../config';

const axiosCustomed = axios.create({
  baseURL: config.domain,
  withCredentials: false,
  headers: {
    token: undefined,
  },
  // withCredentials: false,
});

axiosCustomed.interceptors.request.use(config => {
    // Do something before request is sent
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosCustomed.interceptors.response.use(response => {

  // // The request URL in some case do not interceptor
  if (['http://up.qiniu.com/', 'https://up.qbox.me/'].indexOf(response.request.responseURL) >= 0) {
    return response.data;
  }

  // response status must be 200
  // response statusText must be 'OK'

  const interceptors = response.data;

  if (interceptors.status === 0) {
    return interceptors.result;
  }

  return Promise.reject({ status: interceptors.status, msg: interceptors.msg, interceptor: true });
}, (error) => {
  // Do something with response error
  return Promise.reject(error);
});
axiosCustomed.setToken = (token) => {
  axiosCustomed.defaults.headers.token = token;
};
window.axiosCustomed = axiosCustomed;
export default axiosCustomed;
