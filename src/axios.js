import axios from 'axios'
import qs from 'qs'

var $axios = axios.create({
    baseURL: '/api',
    // 预生产环境
    baseURL: 'http://10.0.0.103:12808/sunEee-large-screen-backround',
    // baseURL: 'http://172.19.21.176:8080',
    //正式环境
    // timeout: 5000,
    headers: {
        //      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    }
});
axios.defaults.withCredentials = true;
//POST传参序列化
$axios.interceptors.request.use((config) => {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    _.toast("错误的传参", 'fail');
    return Promise.reject(error);
});

// 添加一个响应拦截器
$axios.interceptors.response.use(function(res) {
    console.log(res, '00')
        //处理登录超时
    let that = this;
    if (res.data.info === "请登陆!!") {
        // that.$router.push({ path: "/" })
        window.location.href = 'http://10.0.0.103:12808/sunEee-large-screen/index.html#/'
    }
    return res;
}, function(err) {
    return Promise.reject(error);
});

export default $axios