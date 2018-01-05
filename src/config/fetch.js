/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/27
 * @description 项目配置信息
 */

import url from './url'
import ajax from '../plugins/ajax'
import router from '../router'

let requestList = new Set();
let fetchMethod = {};

Object.keys(url).forEach(name => {

    fetchMethod[name] = function (param) {

        return new Promise(function (resolve, reject) {

            let xhr = ajax(Object.assign({}, {

                url: url[name],                   // 请求url
                dataType: 'json',              // 获取的数据类型

                success (data) {
                    if(data && data.state === 200) {
                        resolve(data);
                    } else {
                        reject(data && data.message ? data.message : '没有更多数据！');
                    }
                },

                error () {
                    console.error('接口错误：\n' + url[name]);
                },

                complete () {
                    requestList.delete(xhr);
                }

            }, param));

            requestList.add(xhr);

        }).catch(e => {
            alert(e);
        });

    }
});

// 中断 ajax 请求
router.beforeEach((to, from, next) => {
    for(let xhr of requestList){
        xhr.abort();
    }
    requestList.clear();
    next();
});

// 地区联动菜单
export default fetchMethod;
