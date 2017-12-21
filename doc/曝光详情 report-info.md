### 曝光详情接口

|作者|修改日期|URL| method |
|----|----|---|
|李跃龙|2017-12-21|待定|POST|

------------

####请求参数
|参数名|类型| 描述 |是否必填|
| ---------|--- | ------------ | ---|
|id| Number| 曝光消息ID |是|

-------------------------------
####返回数据
|参数名|类型| 描述 |备注|
| ---------|--- | -----|------|
|state| Number| 请求状态 | 200：请求成功 |
|data | Object | 数据主体 | 无 |
|data.userInfo | Object | 曝光者信息 | 无 |
|data.userInfo.userID | String | 曝光用户id | 无 |
|data.userInfo.name | String | 曝光用户名 | 无 |
|data.userInfo.headImage | String | 曝光用户头像 | 无 |
|data.report | Object | 曝光信息 | 无 |
|data.report.decs | String | 曝光描述 | 无 |
|data.report.date | Date | 曝光日期 | 无 |
|data.report.album | Array | 曝光图册 | 无 |
|data.report.location | String | 曝光地点 | 无 |
|data.report.state | String | 处理状态 | 无 |
|data.feedback | Object | 处理回复消息 | 无 |
|data.feedback[].id | Number |消息ID | 无 |
|data.feedback[].userInfo | Object |回复者信息 | 无 |
|data.feedback[].userInfo.name | String | 回复者用户名 | 无 |
|data.feedback[].userInfo.headImage | String | 回复者用户头像 | 无 |
|data.feedback[].message | String | 回复消息 | 无 |
|data.feedback[].date | Date | 回复时间 | 无 |

-------------------------------------
#### 返回实例
```javascript
{
    "state": 200,
    "data": {
        "userInfo": {
            "userID": "2156454343",
            "name": "小白白",
            "headImage": "http://192.168.199.248:2001/pic/photo.jpg"
        },
        "report": {
            "decs": "该河段漂浮物已清理干净，水面清澈。该河段漂浮物已清理干净，水面清澈。",
            "date": 1513665021,
            "album": [
                "http://192.168.199.248:2001/pic/report-img.jpg",
                "http://192.168.199.248:2001/pic/report-img.jpg",
                "http://192.168.199.248:2001/pic/report-img.jpg"
            ],
            "location": "大埔浈江河段",
            "state": "process"
        },
        "feedback": [
            {
                "id": "100002",
                "userInfo": {
                    "name": "大埔县河长制办公室",
                    "headImage": "http://192.168.199.248:2001/pic/photo.jpg"
                },
                "message": "您好，你的投诉我们正在处理，请耐心等待回复，感谢您对大埔县治水工作的支持！",
                "date": 1513665021
            }
        ]
    }
}
```
