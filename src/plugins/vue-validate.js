/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/1/12 012
 * @description Vue 表单验证方法
 */

let validateNodeList = new Map();

let validate = {};

validate.options = {
    event: 'change'        // 触发验证事件
};

validate.regex = {
    email: /^(\w)+(\W\w+)*@(\w)+(-\w+)*((\.\w+)+)$/,                  // email
    phone: /^1[34578]\d{9}$/,                                         // 手机号码
    tell: /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,      // 固话
    number: /^[\-\+]?((\d+)([\.,](\d+))?|([\.,](\d+))?)$/,            // 数字
    integer: /^\d+$/,                                                 // 整数
    date: /^\d{4}\W\d{1,2}\W\d{1,2}$/,                                // 日期
    time: /^\d{1,2}:\d{1,2}$/,                                        // 时间
    cn: /^[^u4e00-u9fa5\w~!@#$%^&*()_+{}:"<>?\-=[\];\',.\/]+$/,     // 中文
    plus: /^[\+]?((\d+)([\.,](\d+))?|([\.,](\d+))?)$/,                // 正数
    url: /^[a-zA-z]+:\/\/(\w+(-\w+)*)(\.(\w+(-\w+)*))*/,              // 链接
    password: /^[\w~!@#$%^&*()_+{}:"<>?\-=[\];\',.\/]{6,18}$/         // 密码
};

// 将正则转换成验证函数
validate.method = (function () {
    let methods = {};
    Object.keys(validate.regex).forEach(rule => {
        methods[rule] = function (value) {
            return validate.regex[rule].test(String(value).trim());
        }
    });
    return methods;
})();

// 非空验证
validate.method.require = function (value) {
    return !!String(value).trim();
};

validate.install = function (Vue, options) {

    let option = Object.assign({}, validate.options, options);
    let handler;

    // 自定义验证指令
    Vue.directive('validate', {
        bind (el, data) {
            let callback = data.value;
            let modifiers = new Map();

            Object.keys(data.modifiers).map(rules => {

                if (/&|\|/.test(rules)) {

                    modifiers.set(rules, function (value) {
                        let regex = rules.split(/\b/);
                        let result = true;
                        let act = null;

                        for (let item of regex) {

                            if (/^(&|\|)$/.test(item)) {
                                act = item;
                            } else if (validate.method[item]) {
                                if (act) {
                                    if (act === '&') {
                                        result = result && validate.method[item](value);
                                    } else {
                                        result = result || validate.method[item](value);
                                    }
                                } else {
                                    result = validate.method[item](value);
                                }
                            }
                        }

                        return result;
                    });

                } else if (validate.method[rules]) {

                    modifiers.set(rules, validate.method[rules]);
                }

            });

            if (callback && typeof callback === 'function') {

                handler = function () {

                    let val = this.value;
                    let rule = null;
                    let result = true;

                    for(let [name, regex] of modifiers){
                        rule = name;
                        result = result && regex(val);

                        if(!result) {
                            break;
                        }
                    }

                    callback(result, rule, el);

                    return [result, rule, el];
                };

                el.addEventListener(option.event, handler);

                validateNodeList.set(el, handler.bind(el));
            }

        },

        unbind(el) {
            if (handler) {
                el.removeEventListener(option.event, handler);
                validateNodeList.delete(el);
            }
        }
    });

};

export default validate

export function check() {
    let result = true;

    for(let [el, regex] of validateNodeList){
        result = regex()[0] && result;
    }

    return result;
}


