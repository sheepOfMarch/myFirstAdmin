
'use strict';
import axios from 'axios';
import CONFIG from './config.js';
axios.defaults.baseURL = CONFIG.api;
axios.defaults.timeout = 5000;

axios.interceptors.request.use(
   config => {
	   console.log('在发送请求之前触发')
    return config;
  }, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
	console.log('响应数据成功触发')
    return response;
  }, function (error) {
    return Promise.reject(error);
  });


export default axios;