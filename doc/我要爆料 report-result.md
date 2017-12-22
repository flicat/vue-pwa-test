### 我要爆料接口

|作者|修改日期|URL| method |
|----|----|----|----|
|李跃龙|2017-12-21|待定|POST|

------------

####请求参数
|参数名|类型| 描述 |是否必填|备注|
| ---------|--- | -------|----- | ---|
|id| Number| 投诉河道ID |是|无|
|location| String| 举报位置经纬度 |是|无|
|location_info| String| 举报位置描述 |是|无|
|reporter| String| 举报人 |是|无|
|phone| String| 举报电话 |是|无|
|floodType| Number| 治水大类ID |是|无|
|floodSubType| Number| 治水子类ID |是|无|
|description| String| 问题描述 |是|无|
|picture[] | Array| 照片集 |是|无|


-------------------------------
####返回数据
|参数名|类型| 描述 |备注|
| ---------|--- | -----|------|
|state| Number| 请求状态 | 200：请求成功 |
|data | Object | 数据主体 | 无 |
|data.message | String | 爆料结果提示信息| 无 |

-------------------------------------
#### 返回实例
```javascript
{
    "state": 200,
    "data": {
        "message": "爆料成功！"
    }
}
```
