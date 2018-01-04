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

