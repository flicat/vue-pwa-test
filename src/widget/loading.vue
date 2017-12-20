<template>
    <div ref="loading" class="loading">
        <i class="icon-loading"></i>
        <span>加载更多</span>
    </div>
</template>

<script>
    export default {
        name: 'loading',
        props: ['wrap'],          // wrap 列表滚动节点
        mounted () {
            let that = this;

            // loading节点
            let loading = this.$refs.loading;

            if(loading) {

                let body = document.body;
                let scrollAble = false,   // 拖放滚动控制字段
                    loadAble = false;     // 加载事件控制字段
                let startY = 0,           // 开始Y坐标
                    diffY = 0,            // 移动Y坐标值
                    scrollHeight = loading.scrollHeight;     // loading节点高度

                function scrollHandler (e) {

                    let wrap = that.wrap;

                    if(wrap) {
                        // 触摸节点
                        let touches = Array.from(e.touches)[0];

                        switch(e.type) {
                            case 'touchstart':
                                // 是否已经滚动到底部，如果滚动到底部则可以拖放
                                scrollAble = wrap.clientHeight + wrap.scrollTop === wrap.scrollHeight;
                                startY = touches.clientY;

                                break;

                            case 'touchmove':
                                if(scrollAble) {
                                    diffY = (touches.clientY - startY) / 5;

                                    if(diffY < 0) {

                                        // 拖放的高度不能超过loading节点
                                        if(-diffY > scrollHeight) {
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

                                if(loadAble) {
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
                }

                body.addEventListener('touchstart', scrollHandler, false);
                body.addEventListener('touchmove', scrollHandler, false);
                body.addEventListener('touchend', scrollHandler, false);
                body.addEventListener('touchcancel', scrollHandler, false);

            }
        }
    }
</script>


<style lang="less" scope>
    @import "../assets/css/base.less";

    @-webkit-keyframes loading {
        0%, 100% {
        .transform(rotate(0deg));
        }
        1.111111% {
        .transform(rotate((360 / 9 * 1deg)));
        }
        2.222222% {
        .transform(rotate((360 / 9 * 2deg)));
        }
        3.333333% {
        .transform(rotate((360 / 9 * 3deg)));
        }
        4.444444% {
        .transform(rotate((360 / 9 * 4deg)));
        }
        5.555555% {
        .transform(rotate((360 / 9 * 5deg)));
        }
        6.666666% {
        .transform(rotate((360 / 9 * 6deg)));
        }
        7.777777% {
        .transform(rotate((360 / 9 * 7deg)));
        }
        8.888888% {
        .transform(rotate((360 / 9 * 8deg)));
        }
        9.999999% {
        .transform(rotate((360 / 9 * 9deg)));
        }
    }
    @keyframes loading {
        0% {
        .transform(rotate(0deg));
        }
        11.11111% {
        .transform(rotate((-360 / 9 * 1deg)));
        }
        22.22222% {
        .transform(rotate((-360 / 9 * 2deg)));
        }
        33.33333% {
        .transform(rotate((-360 / 9 * 3deg)));
        }
        44.44444% {
        .transform(rotate((-360 / 9 * 4deg)));
        }
        55.55555% {
        .transform(rotate((-360 / 9 * 5deg)));
        }
        66.66666% {
        .transform(rotate((-360 / 9 * 6deg)));
        }
        77.77777% {
        .transform(rotate((-360 / 9 * 7deg)));
        }
        88.88888% {
        .transform(rotate((-360 / 9 * 8deg)));
        }
        100% {
        .transform(rotate(-360deg));
        }
    }

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
