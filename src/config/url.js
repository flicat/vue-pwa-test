/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/28
 * @description 正式环境URL
 */

let domain = 'http://www.keepsoft.cn/wxpt';
// let domain = 'http://conf.free.ngrok.cc';

export default {
    areaLinkage:   domain + '/hehumingluController.do?getDistList',          // 地区联动菜单 done
    articleDetail: domain + '/cmsArticleController.do?cmsArticleDetail',            // 文章详情 done
    articleList:   domain + '/cmsArticleController.do?cmsArticleList',              // 文章列表 done
    floodLinkage:  domain + '/weixinNearBaoliaoController.do?getDealInfos',         // 治水大类联动菜单
    follow:        domain + '/weixinNearBaoliaoController.do?doAddAttention',           // 关注河湖
    nearbyRiver:   domain + '/hehumingluController.do?getNearRivers',                // 附近河湖
    reportInfo:    domain + '/weixinExposureInfoController.do?baoliaoDetail',       // 曝光详情 done
    reportList:    domain + '/weixinExposureInfoController.do?baoliaoList',         // 曝光台列表 / 我的曝光列表 done
    mapReview:     domain + '/weixinNearBaoliaoController.do?mapNearBaoliao',       // 地图预览 done
    report:        domain + '/weixinNearBaoliaoController.do?doAddBaoliao',         // 我要爆料
    riverInfo:     domain + '/hehumingluController.do?getRiverDetail',              // 河湖详情 done
    riverList:     domain + '/hehumingluController.do?getRiverByPage',              // 河湖名录搜索 done
    rivererList:   domain + '/hehumingluController.do?getRiverUserList',            // 河长搜索列表 done
};
