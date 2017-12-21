### 文章列表接口

|作者|修改日期|URL| method |
|----|----|---|
|李跃龙|2017-12-21|待定|POST|

------------

####请求参数
|参数名|类型| 描述 |是否必填|备注|
| ---------|--- | -------|----- | ---|
|pageIndex| Number| 数据分页 index |是|无|
|pageSize | Number | 每页数据 size |是|无|
|type | Number | 文章类型|是|0：无图列表，1：有图列表|

-------------------------------
####返回数据
|参数名|类型| 描述 |备注|
| ---------|--- | -----|------|
|state| Number| 请求状态 | 200：请求成功 |
|data | Object | 数据主体 | 无 |
|data.pageIndex | Number | 当前分页 index | 无 |
|data.pageSize | Number | 每页文章数 size | 无 |
|data.pageTotal | Number | 分页总数 | 无 |
|data.list | Array | 文章列表 | 无 |
|data.list[].id | Number | 文章ID | 无 |
|data.list[].title | String | 文章标题 | 无 |
|data.list[].decs | String | 文章快照 | 无 |
|data.list[].date | Date | 文章发布日期 | 无 |
|data.list[].album | String | 文章预览图 | 无 |
-------------------------------------
#### 返回实例
```javascript
{
    "state": 200,
    "data": {
        "pageIndex": "1",
        "pageSize": "10",
        "pageTotal": "5",
        "list": [
            {
                "id": "100001",
                "title": "大埔县全面推行河长制工大埔县全面推行河长制工",
                "decs": "为进一步落实绿色发展理念，推进生态文明建设为进一步落实绿色发展理念，推进生态文明建设",
                "date": 1513665021,
                "album": "http://192.168.199.248:2001/pic/list.jpg"
            }
        ]
    }
}
```
