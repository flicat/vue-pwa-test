<template>
    <div class="full-loading box">
        <progress :value="value" max="100"></progress>
    </div>
</template>

<script>
    export default {
        name: 'progress-bar',
        props: ['rate'],
        computed: {
            value () {
                if(Number(this.rate)) {
                    return this.rate * 100;
                } else {
                    return 0;
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/base.less";

    .full-loading {
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.5);

        progress {
            width: 12rem;
            height: 1rem;
        }
    }

</style>

