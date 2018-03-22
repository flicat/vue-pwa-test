/**
 * @author liyuelong1020@gmail.com
 * @date 2016-03-29
 * @version 1.0.0
 * @description Ajax
 */


/**
 * @param {Object} object
 * @param {Function} callback
 * @return {undefined}
 * @description 遍历对象
 */
let forEachIn = function(object, callback) {
    Object.keys(object).forEach(key => callback(key, object[key]));
};

let isType = function(target) {
    return ({}).toString.call(target).match(/\s+(\w+)/)[1];
};

/**
 * @param {Object} data
 * @return {String}
 * @description 转换查询字段
 */
let getQueryStr = function(data) {
    let str = [];
    data = data || {};

    let eachArrParam = function(key, arr) {
        key += '[]';
        arr.forEach(function(item) {
            if(Array.isArray(item)) {
                eachArrParam(key, item);
            } else {
                str.push([key, encodeURIComponent(item)].join('='));
            }
        });
    };

    forEachIn(data, function(key, value) {
        if(Array.isArray(value)) {
            eachArrParam(key, value);
        } else {
            str.push([key, encodeURIComponent(value)].join('='));
        }
    });

    if(str.length) {
        return str.join('&');
    } else {
        return void(0);
    }

};

/**
 * @param {String} url
 * @param {Object} data
 * @return {String}
 * @description 拼接 get 请求 url
 */
let getQueryUrl = function(url, data) {
    return [url, getQueryStr(data)]
        .filter(item => !!item)
        .join(/\?/ig.test(url) ? '&' : '?');
};

// 根据格式返回数据
let getDataByType = function(data, type) {
    try{
        switch(String(type).toLowerCase()) {
            case 'script': return new Function(data)(); break;
            case 'json': return JSON.parse(data); break;
            default: return data;
        }
    } catch(e) {
        return data;
    }
};

// 缓存方法
let cache = (function() {
    let ls = localStorage,
        cache_name = '__ajax_cache__',
        cacheData = [];

    try{
        cacheData = JSON.parse(ls[cache_name]);
    } catch(e) {
        cacheData = [];
    }

    if(Object(cacheData) !== 'Array') {
        cacheData = [];
    }

    let getData = function(id) {
        for(let i = 0, len = cacheData.length; i < len; i++){
            if(cacheData[i].id == id && cacheData[i].value){
                return cacheData[i];
            }
        }
    };

    return {

        // 根据ajax参数返回缓存值
        get_cache: function(id) {
            let data = getData(id);
            return data ? data.value : '';
        },

        // 设置缓存值
        set_cache: function(id, value) {
            let data = getData(id), isModify = true;


            if(!data){
                data = {
                    id: id
                };
                cacheData.push(data);
            }

            try{

                let newValue = JSON.stringify(value);
                // 判断数据是否变更
                isModify = !(newValue === data.value);

                // 如果返回的结果跟缓存不一致则替换旧缓存
                if(isModify){
                    data.value = newValue;
                    ls.setItem(cache_name, JSON.stringify(cacheData));
                }

            } catch(e) {
                console.error(e);
            }

            return isModify;

        }
    };
})();

/**
 * @param {options} param
 * @description XMLHttpRequest
 */
let ajax = function(param) {

    let xhr = new XMLHttpRequest(),
        postData,
        timeoutTimer,  // 请求超时计时器
        noSupportType = false;      // 是否支持 responseType

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4){

            xhr.onreadystatechange = null;

            if(timeoutTimer) {
                clearTimeout(timeoutTimer);
            }

            if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                let data;
                let isModify = true;

                try {
                    data = xhr.response || xhr.responseText;
                } catch (e) {
                    data = '';
                }

                if(noSupportType){
                    data = getDataByType(data, param.dataType);
                }

                // 如果使用缓存则保存到缓存中
                if(typeof param.cache === "function" && typeof param.cacheId === "string") {
                    isModify = cache.set_cache(param.cacheId, data);
                }

                // 如果缓存数据有变化则调用  success 方法
                if(isModify){
                    param.success(data);
                }

            } else {
                param.error(xhr);
            }

            param.complete(xhr);
        }
    };

    try {
        // 下载进度事件
        xhr.onprogress = param.download;
        // 上传进度事件
        xhr.upload.onprogress = param.upload;
    } catch(e) {}


    if(/^(ArrayBuffer|Blob|Document|FormData)$/i.test(isType(param.data))) {
        // 如果使用FormData提交数据
        param.type = 'POST';
        postData = param.data;
    } else if(String(param.type).toLowerCase() === 'post'){
        // 如果请求方式为 POST
        param.type = 'POST';
        postData = isType(param.data) === 'Object' ? getQueryStr(param.data) : param.data;
    } else {
        // 如果请求方式为 GET
        param.type = 'GET';
        param.url = getQueryUrl(param.url, param.data);
        postData = null;
    }

    if(param.dataType){
        try {
            xhr.responseType = param.dataType;
            if(!xhr.responseType || xhr.responseType != param.dataType){
                noSupportType = true;
            }
        } catch (e) {
            noSupportType = true;
        }
    }

    xhr.open(param.type, param.url, !!param.async);

    // 请求超时
    param.timeout = Number(param.timeout) || 0;
    if(param.timeout){
        try {
            xhr.timeout = param.timeout;
        } catch (e) {
            timeoutTimer = setTimeout(function() {
                xhr.abort();
            }, param.timeout);
        }
    }

    // 页面刷新时则停止请求
    window.addEventListener('beforeunload', function() {
        xhr.onreadystatechange = null;
        xhr.abort();
    });

    forEachIn(param.header, function(name, value) {
        xhr.setRequestHeader(name, value);
    });
    param.beforeSend(xhr);

    xhr.send(postData);

    // 如果有缓存则使用缓存
    if(typeof param.cache === "function" && typeof param.cacheId === "string") {
        let cacheData = getDataByType(cache.get_cache(param.cacheId), param.dataType);

        if(cacheData){
            setTimeout(function() {
                param.cache(cacheData);
            }, 0);
        }
    }

    return xhr;
};

/**
 * @param {options} param
 * @description jsonp
 */
let jsonp = function(param) {
    let callback = param.jsonp || 'json_callback_' + Date.now(),
        script = document.createElement("script"),
        head = document.head || document.querySelector('head') || document.documentElement;

    let data = param.data || {};
    data['_'] = 'jsonp_' + Date.now();
    data['callback'] = callback;

    window[callback] = function(data) {
        window[callback] = null;
        param.success(data);
    };

    script.async = !!param.async;
    script.charset = 'utf-8';

    script.src = getQueryUrl(param.url, data);

    script.onload = script.onreadystatechange = function( _, isAbort ) {

        if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

            script.onload = script.onreadystatechange = null;

            if ( script.parentNode ) {
                script.parentNode.removeChild( script );
            }

            script = null;
        } else {
            param.error();
        }
    };

    head.insertBefore(script, head.firstChild);

    return script;
};

/**
 * @return {options}
 * @description Ajax 请求设置
 */
let options = {
    type: 'GET',                    // 请求类型
    url: '',                        // 请求url
    async: true,                    // 默认异步请求
    timeout: null,                  // 请求超时
    data: {},                       // 请求参数
    header: {                       // 默认头信息
        // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    dataType: '',                   // 获取的数据类型
    jsonp: '',                      // jsonp
    cache: null,                    // 使用缓存时回调
    cacheId: null,                  // 缓存Id，唯一性
    download: null,                 // 下载进度事件
    upload: null,                   // 上传进度事件
    beforeSend: function() {},      // 请求发送前回调
    success: function() {},         // 成功回调
    error: function() {},           // 失败回调
    complete: function() {}         // 请求结束后回调（无论失败与否）
};

/**
 * @param {String} type
 * @param {String} url
 * @param {Object} data
 * @param {String} dataType
 * @param {Boolean} cache
 * @param {String} jsonp
 * @param {Function} success
 * @param {Function} error
 * @param {Function} complete
 * @param {Function} progress
 * @description Ajax 请求
 */
export default function(option) {
    let param = Object.assign({}, options, option);

    if(option.dataType === 'jsonp'){
        return jsonp(param);
    } else {
        return ajax(param);
    }
}
