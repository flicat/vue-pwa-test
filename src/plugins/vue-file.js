/*!
 * @author liyuelong1020@gmail.com
 * @date 2018/1/12 012
 * @description vue 表单文件处理方法
 */

let fileDirective = {};

fileDirective.install = function (Vue, option) {

    let fileHandler;

    // 自定义文件上传指令
    Vue.directive('file', {
        bind (el, data) {

            fileHandler = function () {

                if (this.files && typeof data.value === 'function') {
                    // 将文件传递给回调函数
                    data.value(this.files);
                }

                this.value = '';
            };

            el.addEventListener('change', fileHandler);
        },

        unbind (el) {
            el.removeEventListener('change', fileHandler)
        }
    });
};

export default fileDirective;
