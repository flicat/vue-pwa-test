/*!
 * @author liyuelong1020@gmail.com
 * @date 2017/12/27
 * @description 项目配置信息
 */


let url = {
    areaLinkage: 'http://192.168.199.248:2001/data/area-linkage.json',          // 地区联动菜单
    articleDetail: 'http://conf.free.ngrok.cc/cmsArticleController.do?cmsArticleDetail',      // 文章详情
    articleList: 'http://conf.free.ngrok.cc/cmsArticleController.do?cmsArticleList',          // 文章列表
    columnList: 'http://192.168.199.248:2001/data/column-list.json',            // 文章栏目
    floodLinkage: 'http://192.168.199.248:2001/data/flood-linkage.json',        // 治水大类联动菜单
    follow: 'http://192.168.199.248:2001/data/follow-result.json',        // 关注河湖
    nearbyRiver: 'http://192.168.199.248:2001/data/nearby-river.json',          // 附近河湖
    reportInfo: 'http://conf.free.ngrok.cc/weixinExposureInfoController.do?baoliaoDetail',            // 曝光详情
    reportList: 'http://conf.free.ngrok.cc/weixinExposureInfoController.do?baoliaoList',            // 曝光台列表 / 我的曝光列表
    mapReview: 'http://192.168.199.248:2001/data/report-point.json',          // 地图预览
    report: 'http://192.168.199.248:2001/data/report-result.json',        // 我要爆料
    riverInfo: 'http://192.168.199.248:2001/data/river-info.json',              // 河湖详情
    riverList: 'http://192.168.199.248:2001/data/river-list.json',              // 河湖名录搜索
    rivererList: 'http://192.168.199.248:2001/data/riverer-list.json',          // 河长搜索列表
};

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
