/*!
 * @author liyuelong1020@gmail.com
 * @date 2017/12/27
 * @description 项目配置信息
 */


let url = {
    areaLinkage: 'http://192.168.199.248:2001/data/area-linkage.json',          // 地区联动菜单
    articleDetail: 'http://192.168.199.248:2001/data/article-detail.json',      // 文章详情
    articleList: 'http://192.168.199.248:2001/data/article-list.json',          // 文章列表
    columnList: 'http://192.168.199.248:2001/data/column-list.json',            // 文章栏目
    floodLinkage: 'http://192.168.199.248:2001/data/flood-linkage.json',        // 治水大类联动菜单
    followResult: 'http://192.168.199.248:2001/data/follow-result.json',        // 关注河湖
    myReport: 'http://192.168.199.248:2001/data/my-report.json',                // 我的曝光列表
    nearbyRiver: 'http://192.168.199.248:2001/data/nearby-river.json',          // 附近河湖
    reportInfo: 'http://192.168.199.248:2001/data/report-info.json',            // 曝光详情
    reportList: 'http://192.168.199.248:2001/data/report-list.json',            // 曝光台列表
    reportPoint: 'http://192.168.199.248:2001/data/report-point.json',          // 地图预览
    reportResult: 'http://192.168.199.248:2001/data/report-result.json',        // 我要爆料
    riverInfo: 'http://192.168.199.248:2001/data/river-info.json',              // 河湖详情
    riverList: 'http://192.168.199.248:2001/data/river-list.json',              // 河湖名录搜索
    rivererList: 'http://192.168.199.248:2001/data/riverer-list.json',          // 河长搜索列表
};

let getData = function (name, param, option) {
    let urlObj = new (URL || webkitURL)(url[name]);
    let options = Object.assign({
        method: 'GET'
    }, option);

    if(options.method === 'GET') {
        let queryStr = Object.keys(param).map(key => [key, param[key]].join('=')).join('&');
        if(urlObj.search) {
            urlObj.search += `&${queryStr}`;
        } else {
            urlObj.search = queryStr;
        }
    }

    return fetch(urlObj, options)
        .then(res => res.json())
        .catch(error => alert(error));

};

let fetchMethod = {};
Object.keys(url).forEach(name => {
    fetchMethod[name] = function (args) {
        return getData(...args);
    }
});

// 地区联动菜单
export default fetchMethod;
