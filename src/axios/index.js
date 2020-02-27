// import JsonP from 'jsonp'
import axios from 'axios'
import { notification } from 'antd'
let base = "";  /** 普通封装api接口适用于大厅里面 */
const $http = axios.create({
    /** 设置超时时间10S */
    timeout: 10000
})
/** 请求前拦截 */
$http.interceptors.request.use(
    config => {
        /** 在发送请求之前做某事，比如加一个loading */
        return config;
    },
    err => {
        openNotificationWithIcon('error', '提示', '请求超时！1')
        return Promise.reject(err);
    }
);
/** 返回后拦截 */
$http.interceptors.response.use(
    res => {
        /** 需要在此处理返回信息错误情况 */
        return res.data
    },
    err => {
        if (err.response) {
            if (err.response.status === 504 || err.response.status === 404 || err.response.status === 500) {
                openNotificationWithIcon('error', '错误提示', '服务器连接异常，请检查相关连接')
            } else if (err.response.status === 401) {
                openNotificationWithIcon('error', 'token失效', '登录信息失效')
            } else {
                openNotificationWithIcon('error', '错误提示', '未知错误！')
            }
        } else {
            openNotificationWithIcon('error', '错误提示', '连接超时!请检查网络。。')
        }
        return Promise.resolve(err)
        /** return Promise.reject(err);  此时不需要执行reject 改为执行resolve */
    }
);
/** 报错提示信息 */
const openNotificationWithIcon = (type, inputType, content) => {
    notification[type]({
        message: inputType,
        description: content,
    });
};
/** 请求需要添加header 处理
 * @普通post请求
 * @param {String} url 请求路径
 * @param {Object} params 请求参数
 */
const post = (url, params) => {
    return $http({
        method: "post",
        url: `${base}${url}`,
        data: params,
        headers: {
            "Content-Type": "application/json",
            charset: "utf-8",
            'auth': localStorage.getItem('token') || '',
        }
    }).then((response) => {
        return response
    }).catch((error) => {
        return error;
    });
};

/**post文件请求
 * @param {String} url 请求路径
 * @param {Object} params 请求参数
 */
const postFile = (url, params) => {
    return $http({
        method: "post",
        url: `${base}${url}`,
        data: params,
        transformRequest: [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ],
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'auth': localStorage.getItem('token') || '',
        }
    });
};
/**另一种文件的请求
 * @param {String} url 请求路径
 * @param {Object} params 请求参数
 */
const uploadFile = (url, params) => {
    return $http({
        method: 'post',
        url: `${url}`,
        data: params,
        transformRequest: [
            function (data) {
                let ret = "";
                for (let it in data) {
                    ret +=
                        encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                }
                return ret;
            }
        ],
        headers: {
            "Content-Type": "multipart/form-data",
            'auth': localStorage.getItem('token'),
        }
    })
}
/**
 * get请求封装
 * @param {String} url 
 * @param {Object} params 
 */
const get = (url, params) => {
    return $http({
        method: "get",
        url: `${base}${url}`,
        data: params,
        headers: {
            'auth': localStorage.getItem('token'),
        }
    });
};
/**
 * 全部请求封装
 * @param {Array} requsetArray 请求数组对象
 * @param {Function} callback  返回函数
 */
const multiple = function (requsetArray, callback) {
    $http.all(requsetArray).then(axios.spread(callback));
};
export {
    get, post, postFile, multiple, uploadFile
}
