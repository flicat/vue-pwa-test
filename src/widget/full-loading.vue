<template>
    <div class="full-loading box">
        <i class="icon-loading"></i>
    </div>
</template>

<script>
    export default {
        name: 'full-loading'
    }
</script>

<style lang="less">
    @import "../assets/css/base.less";

    @-webkit-keyframes loading {
        0% {
            .transform(rotate(0deg));
        }
        12.5% {
            .transform(rotate((-360 / 8 * 1deg)));
        }
        25% {
            .transform(rotate((-360 / 8 * 2deg)));
        }
        37.5% {
            .transform(rotate((-360 / 8 * 3deg)));
        }
        50% {
            .transform(rotate((-360 / 8 * 4deg)));
        }
        62.5% {
            .transform(rotate((-360 / 8 * 5deg)));
        }
        75% {
            .transform(rotate((-360 / 8 * 6deg)));
        }
        87.5% {
            .transform(rotate((-360 / 8 * 7deg)));
        }
        100% {
            .transform(rotate(-360deg));
        }
    }
    @keyframes loading {
        0% {
            .transform(rotate(0deg));
        }
        12.5% {
            .transform(rotate((-360 / 8 * 1deg)));
        }
        25% {
            .transform(rotate((-360 / 8 * 2deg)));
        }
        37.5% {
            .transform(rotate((-360 / 8 * 3deg)));
        }
        50% {
            .transform(rotate((-360 / 8 * 4deg)));
        }
        62.5% {
            .transform(rotate((-360 / 8 * 5deg)));
        }
        75% {
            .transform(rotate((-360 / 8 * 6deg)));
        }
        87.5% {
            .transform(rotate((-360 / 8 * 7deg)));
        }
        100% {
            .transform(rotate(-360deg));
        }
    }

    .full-loading {
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.5);

        .icon-loading {
            display: block;
            width: (100 / @rem);
            height: (100 / @rem);
            background: url(../assets/images/loading.png) no-repeat 50% 50%;
            background-size: contain;
            animation: loading 1s step-start infinite;
        }
    }
</style>

