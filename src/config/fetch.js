/*!
 * @author liyuelong1020@gmail.com
 * @date 2017/12/27
 * @description 项目配置信息
 */

import url from './localUrl'

let getData = function (name, param, option) {
    let urlObj = new (URL || webkitURL)(url[name]);
    let options = Object.assign({
        method: 'GET'
    }, option);

    if(options.method === 'GET' && param) {
        let queryStr = Object.keys(param).map(key => [key, param[key]].join('=')).join('&');

        if(urlObj.search) {
            urlObj.search += `&${queryStr}`;
        } else {
            urlObj.search = queryStr;
        }
    }

    return fetch(urlObj, options)
        .then(res => res.json())
        .then(data => {

            if(data && data.state === 200) {
                return data;
            }

            if(data && data.state !== 200) {
                alert(data || '没有更多数据！');
            }

            return null;
        })
        .catch(error => alert('接口错误：\n' + urlObj.href));

};

let fetchMethod = {};
Object.keys(url).forEach(name => {
    fetchMethod[name] = function ({param, option} = {}) {
        return getData(name, param, option);
    }
});

// 地区联动菜单
export default fetchMethod;
