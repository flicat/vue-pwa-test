<template>
    <transition name="fade">
        <a v-show="show" href="javascript:;" class="go-top" @click="goTop"></a>
    </transition>
</template>

<script>

    const scrollToTop = (wrap) => {
        const top = wrap.scrollTop;
        if (top > 0) {
            window.requestAnimationFrame(() => scrollToTop(wrap));
            wrap.scrollTop = top - top / 8;
        }
    };

    let scrollHandler;

    export default {
        name: 'goTop',
        props: ['wrap'],          // wrap 列表滚动节点
        data () {
            return {
                _wrap: null,
                show: false
            }
        },
        mounted () {
            let that = this;
            let body = document.body;
            that._wrap = that.wrap();

            scrollHandler = function (e) {
                that.show = this.scrollTop > 0;
            };

            let handler = function () {
                if(that._wrap) {
                    that._wrap.addEventListener('scroll', scrollHandler, false);
                    body.removeEventListener('touchstart', handler);
                }
            };
            body.addEventListener('touchstart', handler, false);
        },
        destroyed () {
            if(this._wrap) {
                this._wrap.removeEventListener('scroll', scrollHandler);
            }
        },
        methods: {
            goTop () {
                // 点击返回到顶部
                if(this._wrap) {
                    scrollToTop(this._wrap);
                    this.show = false;
                }
            }
        }
    }
</script>


<style lang="less" scoped>
    @import "../assets/css/base.less";

    .go-top {
        display: block;
        position: absolute;
        bottom: (130 / @rem);
        right: (38 / @rem);
        z-index: 999;
        width: (87 / @rem);
        height: (87 / @rem);
        background: url(../assets/images/icon-go-top.png) no-repeat 0 0 #fff;
        background-size: 100%;
        border-radius: 999px;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s linear;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }

</style>
