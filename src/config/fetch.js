/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/27
 * @description 项目配置信息
 */

import url from './localUrl'
import ajax from '../plugins/ajax'
import router from '../router'

let requestList = new Set();

let getData = function (url, param) {

    return new Promise(function (resolve, reject) {
        let xhr = ajax(Object.assign({
            type: 'GET',               // 请求类型
            url: url,                   // 请求url
            async: true,               // 默认异步请求
            timeout: 10000,             // 请求超时
            dataType: 'json',              // 获取的数据类型

            success (data) {
                if(data && data.state === 200) {
                    resolve(data);
                }
                if(data && data.state !== 200) {
                    reject(data.data || '没有更多数据！');
                }
            },

            error () {
                reject('接口错误：\n' + url)
            },

            complete () {
                requestList.delete(xhr);
            }

        }, param));

        requestList.add(xhr);
    });
};

let fetchMethod = {};
Object.keys(url).forEach(name => {
    fetchMethod[name] = function (param) {
        return getData(url[name], param);
    }
});

// 中断 ajax 请求
router.beforeEach((to, from, next) => {
    for(let xhr of requestList){
        xhr.abort();
    }
    next();
});

// 地区联动菜单
export default fetchMethod;
