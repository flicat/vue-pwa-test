/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/28
 * @description 正式环境URL
 */

// let domain = 'http://www.keepsoft.cn/wxpt';
let domain = 'http://conf.free.ngrok.cc';

export default {
    areaLinkage:   domain + '/hehumingluController.do?getDistList.action',          // 地区联动菜单
    articleDetail: domain + '/cmsArticleController.do?cmsArticleDetail',            // 文章详情
    articleList:   domain + '/cmsArticleController.do?cmsArticleList',              // 文章列表
    floodLinkage:  domain + '/weixinNearBaoliaoController.do?getDealInfos',         // 治水大类联动菜单
    follow:        'http://192.168.199.248:2001/data/follow-result.json',           // 关注河湖
    nearbyRiver:   'http://192.168.199.248:2001/data/nearby-river.json',            // 附近河湖
    reportInfo:    domain + '/weixinExposureInfoController.do?baoliaoDetail',       // 曝光详情
    reportList:    domain + '/weixinExposureInfoController.do?baoliaoList',         // 曝光台列表 / 我的曝光列表
    mapReview:     domain + '/weixinNearBaoliaoController.do?mapNearBaoliao',       // 地图预览
    report:        domain + '/weixinNearBaoliaoController.do?doAddBaoliao',         // 我要爆料
    riverInfo:     domain + '/hehumingluController.do?getRiverDetail',              // 河湖详情
    riverList:     domain + '/hehumingluController.do?getRiverByPage',              // 河湖名录搜索
    rivererList:   domain + '/hehumingluController.do?getRiverUserList',            // 河长搜索列表
};
