### 我的曝光列表接口

|作者|修改日期|URL| method |
|----|----|---|
|李跃龙|2017-12-21|待定|POST|

------------

####请求参数
|参数名|类型| 描述 |是否必填|
| ---------|--- | ------------ | ---|
|pageIndex| Number| 数据分页 index |是|
|pageSize | Number | 每页数据 size |是|

-------------------------------
####返回数据
|参数名|类型| 描述 |备注|
| ---------|--- | -----|------|
|state| Number| 请求状态 | 200：请求成功 |
|data | Object | 数据主体 | 无 |
|data.userInfo | Object | 我的信息 | 无 |
|data.userInfo.name | String | 我的昵称 | 无 |
|data.userInfo.headImage | String | 我的头像url | 无 |
|data.report|Object|我的曝光|无|
|data.report.pageIndex | Number | 当前分页 index | 无 |
|data.report.pageSize | Number | 每页消息数 size | 无 |
|data.report.pageTotal | Number | 分页总数 | 无 |
|data.report.list | Array | 消息列表 | 无 |
|data.report.list[].id | Number | 消息ID | 无 |
|data.report.list[].decs | String | 曝光信息 | 无 |
|data.report.list[].date | Date | 曝光时间 | 秒 |
|data.report.list[].album | Array | 曝光照片 | 无 |
|data.report.list[].location | String | 曝光地址 | 无 |
|data.report.list[].state | String | 曝光处理状态 | process：处理中；done：已处理 |

-------------------------------------
#### 返回实例
```javascript
{
    "state": 200,
    "data": {
        "userInfo": {
            "name": "神奇女侠",
            "headImage": "http://192.168.199.248:2001/pic/photo.jpg"
        },
        "report": {
            "pageIndex": "1",
            "pageSize": "3",
            "pageTotal": "10",
            "list": [
                {
                    "id": "100001",
                    "decs": "该河段漂浮物已清理干净，水面清澈。该河段漂浮物已清理干净，水面清澈。",
                    "date": 1513665021,
                    "album": [
                        "http://192.168.199.248:2001/pic/report-img.jpg",
                        "http://192.168.199.248:2001/pic/report-img.jpg",
                        "http://192.168.199.248:2001/pic/report-img.jpg"
                    ],
                    "location": "大埔浈江河段",
                    "state": "process"
                }
            ]
        }
    }
}

```
