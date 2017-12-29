/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/28
 * @description 局域网测试数据
 */

let domain = 'http://www.keepsoft.cn/wxpt/demoData/data/';
let domain2 = 'http://www.keepsoft.cn/wxpt';

export default {
    areaLinkage:   domain + 'area-linkage.json',      // 地区联动菜单

    articleDetail: domain2 + '/cmsArticleController.do?cmsArticleDetail',            // 文章详情
    articleList:   domain2 + '/cmsArticleController.do?cmsArticleList',              // 文章列表

    // articleDetail: domain + 'article-detail.json',    // 文章详情
    // articleList:   domain + 'article-list.json',      // 文章列表
    floodLinkage:  domain + 'flood-linkage.json',     // 治水大类联动菜单
    follow:        domain + 'follow-result.json',     // 关注河湖
    nearbyRiver:   domain + 'nearby-river.json',      // 附近河湖

    reportInfo:    domain2 + '/weixinExposureInfoController.do?baoliaoDetail',       // 曝光详情
    // reportInfo:    domain + 'report-info.json',       // 曝光详情
    // reportList:    domain + 'report-list.json',       // 曝光台列表 / 我的曝光列表
    reportList:    domain2 + '/weixinExposureInfoController.do?baoliaoList',         // 曝光台列表 / 我的曝光列表
    mapReview:     domain + 'report-point.json',      // 地图预览
    report:        domain + 'report-result.json',     // 我要爆料
    riverInfo:     domain + 'river-info.json',        // 河湖详情
    riverList:     domain + 'river-list.json',        // 河湖名录搜索
    rivererList:   domain2 + '/hehumingluController.do?getRiverUserList',            // 河长搜索列表
};
