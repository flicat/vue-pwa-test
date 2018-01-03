<template>
    <div id="app" class="wrap">
        <router-view @progress="progress" @loading="loading" />
        <full-loading v-show="showLoading"></full-loading>
        <progress-bar :rate="rate"></progress-bar>
    </div>
</template>

<script>
    import FullLoading from '@/widget/full-loading';
    import progressBar from '@/widget/progress-bar';

    export default {
        name: 'app',
        components: {
            'full-loading': FullLoading,            // 全局loading
            'progress-bar': progressBar                    // 全局进度条
        },
        data () {
            return {
                rate: 0,
                showLoading: this.$store.state.showLoading
            };
        },
        updated() {
            // 保存微信 code 和 appid
            this.$store.commit('appCode', this.$route.query);
        },
        methods: {
            progress (rate) {
                this.rate = rate;
            },
            loading (isShow) {
                this.$store.commit('loading', isShow);
            }
        }
    }
</script>

<style src="./assets/css/normalize.less" lang="less"></style>
<style src="./assets/css/global.less" lang="less"></style>
