import axios from "axios";
import { Component } from "react";
import { BASE_URL } from "./url";

// 定义基地址：
axios.defaults.baseURL = BASE_URL;

// 将axios实例挂载到Component中：
Component.prototype.axios = axios;

export { axios };
