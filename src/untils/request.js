// axios.js
import axios from 'axios';
import { ElMessage } from 'element-plus'; // 假设你使用Element Plus的提示组件

// 创建axios实例
const axioss = axios.create({
    baseURL: "http://localhost:8081", // 应用的基本URL
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
axioss.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么，例如添加认证头
        const token = sessionStorage.getItem('token');
        if (token) {

            config.headers.Authorization = `Bearer ${token}`;
            config.headers.satoken = token
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
axioss.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么,这里是直接返回值的data，可以直观的看到关键信息
        return response.data;
    },
    (error) => {
        // 处理错误响应
        const errMsg = error.response?.data?.message || '网络错误，请稍后再试';
        ElMessage.error(errMsg); // 显示错误消息
        return Promise.reject(new Error(errMsg));
    }
);

//get请求
const get = (url, params) => {
    return axioss.get(url, { params });
}

//post请求
const post = (url, data) => {
    return axioss.post(url, data);
}

// delete请求
const del = (url, params) => {
    return axioss.delete(url, { params });
}

export default axioss; // 如果需要直接使用axios实例，也可以导出