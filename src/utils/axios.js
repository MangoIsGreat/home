import axios from "axios";
import { Component } from "react";
import { BASE_URL } from "./url";
import { getToken } from "./token";

// 定义基地址：
axios.defaults.baseURL = BASE_URL;

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = getToken();

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 将axios实例挂载到Component中：
Component.prototype.axios = axios;

export { axios };
