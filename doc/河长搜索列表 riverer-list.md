### 河长搜索列表接口

|作者|修改日期|URL| method |
|----|----|---|
|李跃龙|2017-12-21|待定|POST|

------------

####请求参数
|参数名|类型| 描述 |是否必填|
| ---------|--- | ------------ | ---|
|name| String| 河长名称（优先搜索名称，忽略镇&村） |否|
|townId| String| 河长所在镇ID |否|
|villageId| String| 河长所在村ID（以上搜索参数未提供则返回全部） |否|
|pageIndex| Number| 数据分页 index |是|
|pageSize | Number | 每页数据 size |是|

-------------------------------
####返回数据
|参数名|类型| 描述 |备注|
| ---------|--- | -----|------|
|state| Number| 请求状态 | 200：请求成功 |
|data | Object | 数据主体 | 无 |
|data.pageIndex | Number | 当前分页 index | 无 |
|data.pageSize | Number | 每页数据数量 size | 无 |
|data.pageTotal | Number | 分页总数 | 无 |
|data.list | Array | 河长列表 | 无 |
|data.list[].id |Number| 河长ID | 无 |
|data.list[].name |String| 河长姓名| 无 |
|data.list[].sex |String| 河长性别 | male：男，female：女 |
|data.list[].title |String| 河长职务 | 无 |
|data.list[].address |String| 住址 | 无 |
|data.list[].tel |String| 办公电话 | 无 |
|data.list[].email |String| 办公邮箱 | 无 |


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
                "name": "张庆德",
                "sex": "male",
                "title": "百侯村村级河长",
                "address": "大埔县桃瑶镇百侯村",
                "tel": "0753-45687452",
                "email": "dabuhz@gmail.com"
            }
        ]
    }
}
```
