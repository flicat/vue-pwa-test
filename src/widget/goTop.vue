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

    export default {
        name: 'goTop',
        props: ['wrap'],          // wrap 列表滚动节点
        data () {
            return {
                show: false
            }
        },
        mounted () {
            let that = this;
            let body = document.body;

            let handler = function () {
                if(that.wrap) {
                    that.wrap.addEventListener('scroll', function (e) {
                        that.show = this.scrollTop > 0;
                    }, false);
                    body.removeEventListener('touchstart', handler);
                }
            };
            body.addEventListener('touchstart', handler, false);
        },
        methods: {
            goTop () {
                // 点击返回到顶部
                if(this.wrap) {
                    scrollToTop(this.wrap);
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
