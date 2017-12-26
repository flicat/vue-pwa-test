<template>
    <div ref="loading" class="loading">
        <i class="icon-loading"></i>
        <span>加载更多</span>
    </div>
</template>

<script>
    let scrollHandler;
    let body = document.body;

    export default {
        name: 'loading',
        props: ['wrap'],          // wrap 列表滚动节点
        mounted() {
            let that = this;

            // loading节点
            let loading = this.$refs.loading;

            if (loading) {

                let scrollAble = false,   // 拖放滚动控制字段
                    loadAble = false;     // 加载事件控制字段
                let startY = 0,           // 开始Y坐标
                    diffY = 0,            // 移动Y坐标值
                    scrollHeight = loading.scrollHeight;     // loading节点高度

                let wrap = that.wrap();

                scrollHandler = function (e) {

                    if (wrap) {
                        // 触摸节点
                        let touches = Array.from(e.touches)[0];

                        switch (e.type) {
                            case 'touchstart':
                                // 是否已经滚动到底部，如果滚动到底部则可以拖放
                                scrollAble = wrap.clientHeight + wrap.scrollTop >= wrap.scrollHeight - 5;
                                startY = touches.clientY;

                                break;

                            case 'touchmove':
                                if (scrollAble) {
                                    diffY = (touches.clientY - startY) / 5;
                                    if (diffY < 0) {

                                        // 拖放的高度不能超过loading节点
                                        if (-diffY > scrollHeight) {
                                            diffY = -scrollHeight;
                                            loadAble = true;
                                        }

                                        loading.style.transform =
                                            loading.style.webkitTransform =
                                                wrap.style.transform =
                                                    wrap.style.webkitTransform = 'translate3d(0,' + diffY + 'px,0)';

                                    }

                                }
                                break;

                            case 'touchend':
                            case 'touchcancel':

                                if (loadAble) {
                                    // 出发load事件
                                    that.$emit('load', function () {
                                        loading.style.transform =
                                            loading.style.webkitTransform =
                                                wrap.style.transform =
                                                    wrap.style.webkitTransform = 'none';

                                    });
                                } else {
                                    loading.style.transform =
                                        loading.style.webkitTransform =
                                            wrap.style.transform =
                                                wrap.style.webkitTransform = 'none';
                                }

                                loadAble = false;
                                scrollAble = false;
                                diffY = 0;

                                break;
                        }
                    }
                };

                body.addEventListener('touchstart', scrollHandler, false);
                body.addEventListener('touchmove', scrollHandler, false);
                body.addEventListener('touchend', scrollHandler, false);
                body.addEventListener('touchcancel', scrollHandler, false);

            }
        },
        destroyed() {
            body.removeEventListener('touchstart', scrollHandler, false);
            body.removeEventListener('touchmove', scrollHandler, false);
            body.removeEventListener('touchend', scrollHandler, false);
            body.removeEventListener('touchcancel', scrollHandler, false);
            scrollHandler = null;
        }
    }
</script>


<style lang="less" scope>
    @import "../assets/css/base.less";

    .loading {
        position: fixed;
        left: 0;
        top: 100%;
        z-index: 9999;
        width: 100%;
        padding: (18 / @rem) 0;
        height: (48 / @rem);
        line-height: (48 / @rem);
        text-align: center;
        background-color: #e5e5e7;

        span {
            font-size: (28 / @rem);
            color: #999;
        }

        .icon-loading {
            display: inline-block;
            width: (48 / @rem);
            height: (48 / @rem);
            background: url(../assets/images/loading.png) no-repeat 50% 50%;
            background-size: contain;
            vertical-align: middle;
            margin-right: 0.5em;
            animation: loading 1s step-start infinite;
        }
    }

</style>
