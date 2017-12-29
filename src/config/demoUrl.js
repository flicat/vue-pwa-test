/*
 * @author liyuelong1020@gmail.com
 * @date 2017/12/28
 * @description 局域网测试数据
 */

let domain = 'http://www.keepsoft.cn/wxpt/demoData/data/';
let domain2 = 'http://www.keepsoft.cn/wxpt';

export default {
    areaLinkage:   domain2 + '/hehumingluController.do?getDistList',          // 地区联动菜单 done
    articleDetail: domain2 + '/cmsArticleController.do?cmsArticleDetail',            // 文章详情 done
    articleList:   domain2 + '/cmsArticleController.do?cmsArticleList',              // 文章列表 done
    floodLinkage:  domain + 'flood-linkage.json',         // 治水大类联动菜单
    follow:        domain + 'follow-result.json',     // 关注河湖
    nearbyRiver:   domain + 'nearby-river.json',      // 附近河湖
    reportInfo:    domain2 + '/weixinExposureInfoController.do?baoliaoDetail',       // 曝光详情 done
    reportList:    domain2 + '/weixinExposureInfoController.do?baoliaoList',         // 曝光台列表 / 我的曝光列表 done
    mapReview:     domain2 + '/weixinNearBaoliaoController.do?mapNearBaoliao',       // 地图预览 done
    report:        domain + 'report-result.json',     // 我要爆料
    riverInfo:     domain2 + '/hehumingluController.do?getRiverDetail',              // 河湖详情 done
    riverList:     domain2 + '/hehumingluController.do?getRiverByPage',              // 河湖名录搜索 done
    rivererList:   domain2 + '/hehumingluController.do?getRiverUserList',            // 河长搜索列表 done
};
