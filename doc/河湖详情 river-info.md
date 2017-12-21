### 河湖详情接口

|作者|修改日期|URL| method |
|----|----|---|
|李跃龙|2017-12-21|待定|POST|

------------

####请求参数
|参数名|类型| 描述 |是否必填|
| ---------|--- | ------------ | ---|
|id| Number| 河流ID |是|

-------------------------------
####返回数据
|参数名|类型| 描述 |备注|
| ---------|--- | -----|------|
|state| Number| 请求状态 | 200：请求成功 |
|data | Object | 数据主体 | 无 |
|data.id | Number | 当前分页 index | 无 |
|data.name            | String | 河流名称 | 无 |
|data.location        | String | 河流经纬度 | 无 |
|data.topRiverer      | Object | 总河长 | 无 |
|data.topRiverer.name | String | 总河长名字 | 无 |
|data.topRiverer.title| String | 总河长职务 | 无 |
|data.viceRiverer     | Object | 副总河长 | 无 |
|data.viceRiverer.name | String | 河长名字 | 无 |
|data.viceRiverer.title| String | 河长职务 | 无 |
|data.riverer         | Object | 河长 | 无 |
|data.riverer.name | String | 河长名字 | 无 |
|data.riverer.title| String | 河长职务 | 无 |
|data.cityLevel       | String | 市级 | 无 |
|data.countyLevel     | String | 县级 | 无 |
|data.from            | String | 河流源头| 无 |
|data.end             | String | 河流终点 | 无 |
|data.land            | String | 岸别 | 无 |
|data.collectingArea  | String | 河流集雨面积 | 无 |
|data.length          | String | 河段长度 | 无 |
|data.system          | String | 水系 | 无 |
|data.remarks         | String | 备注 | 无 |
|data.townId          | Number | 所属镇ID| 无 |
|data.villageId       | Number | 所属村ID | 无 |
|data.supRiverId      | Number | 上级河流ID | 无 |

-------------------------------------
#### 返回实例
```javascript
{
    "state": 200,
    "data": {
        "id": "100001",
        "name": "浈江大埔区段",
        "location": "112.865569,23.951898",
        "topRiverer": {
            "name": "郑晓燕",
            "title": "区书记"
        },
        "viceRiverer": {
            "name": "张仁建",
            "title": "区长"
        },
        "riverer": {
            "name": "张仁建",
            "title": "区长"
        },
        "cityLevel": "广州市",
        "countyLevel": "大埔县",
        "from": "石厘头",
        "end": "南岗河",
        "land": "右岸",
        "collectingArea": "2565.468km²",
        "length": "3.5Km",
        "system": "北江",
        "remarks": "无污染河涌",
        "townId": "154451",
        "villageId": "35461351",
        "supRiverId": "68768435"
    }
}
```
