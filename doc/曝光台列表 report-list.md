### 曝光台列表接口

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
|data.pageIndex | Number | 当前分页 index | 无 |
|data.pageSize | Number | 每页消息数 size | 无 |
|data.pageTotal | Number | 分页总数 | 无 |
|data.list | Array | 消息列表 | 无 |
|data.list[].id | Number | 消息ID | 无 |
|data.list[].userInfo | Object | 曝光者信息 | 无 |
|data.list[].userInfo.name | String | 曝光者昵称 | 无 |
|data.list[].userInfo.headImage | String | 曝光者头像url | 无 |
|data.list[].decs | String | 曝光信息 | 无 |
|data.list[].date | Date | 曝光时间 | 秒 |
|data.list[].album | Array | 曝光照片 | 无 |
|data.list[].likes | Array | 点赞人 | 无 |
|data.list[].comment | Array | 评论 | 无 |
|data.list[].comment.user | String | 评论人昵称 | 无 |
|data.list[].comment.message | String | 评论消息 | 无 |
|data.list[].comment.reply | String | 评论回复人昵称 | 无 |
|data.list[].location | String | 曝光地址 | 无 |
|data.list[].state | String | 曝光处理状态 | process：处理中；done：已处理 |

-------------------------------------
#### 返回实例
```javascript
{
    "state": 200,
    "data": {
        "pageIndex": 1,
        "pageSize": 3,
        "pageTotal": 10,
        "list": [
            {
                "id": "100001",
                "userInfo": {
                    "name": "神奇女侠",
                    "headImage": "http://192.168.199.248:2001/pic/photo.jpg"
                },
                "decs": "该河段漂浮物已清理干净，水面清澈。该河段漂浮物已清理干净，水面清澈。",
                "date": 1513665021,
                "album": [
                    "http://192.168.199.248:2001/pic/report-img.jpg",
                    "http://192.168.199.248:2001/pic/report-img.jpg",
                    "http://192.168.199.248:2001/pic/report-img.jpg"
                ],
                "likes": [
                    "Lisa",
                    "雷神"
                ],
                "comment": [
                    {
                        "user": "钢铁侠",
                        "message": "处理状况良好！",
                        "reply": ""
                    },
                    {
                        "user": "绿灯侠",
                        "message": "那是必须的！",
                        "reply": "钢铁侠"
                    }
                ],
                "location": "大埔浈江河段",
                "state": "process"
            }
        ]
    }
}

```
