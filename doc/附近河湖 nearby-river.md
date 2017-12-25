### 附近河湖接口

|作者|修改日期|URL| method |
|----|----|---|
|李跃龙|2017-12-21|待定|POST|

------------

####请求参数
|参数名|类型| 描述 |是否必填|
| ---------|--- | ------------ | ---|
|location| String| 坐标经纬度 |是|
|range| Number| 范围|是|
|pageIndex| Number| 数据分页 index |是|
|pageSize | Number | 每页数据 size |是|

-------------------------------
####返回数据
|参数名|类型| 描述 |备注|
| ---------|--- | -----|------|
|state| Number| 请求状态 | 200：请求成功 |
|data | Object | 数据主体 | 无 |
|data.pageIndex | Number | 当前分页 index | 无 |
|data.pageSize | Number | 每页数据 size | 无 |
|data.pageTotal | Number | 分页总数 | 无 |
|data.list | Array | 河流列表 | 无 |
|data.list[].id | Number | 河流ID | 无 |
|data.list[].name | Number | 河流ID | 无 |
|data.list[].area | String | 河流所在区域 | 无 |
|data.list[].length | String | 河流长度 | 无 |
|data.list[].decs | String | 河流描述 | 无 |
|data.list[].from | String | 河流源头 | 无 |
|data.list[].end | String | 河流终点 | 无 |
|data.list[].thumb | String | 河流缩略图 | 无 |
|data.list[].follow | Number | 是否关注 | 1：已关注，0：未关注 |
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
                "name": "浈江大埔区段",
                "area": "大埔县",
                "length": "3.5Km",
                "decs": "无污染河涌",
                "from": "石厘头",
                "end": "南岗河",
                "thumb": "http://192.168.199.248:2001/pic/list.jpg",
                "follow": 1
            }
        ]
    }
}
```
