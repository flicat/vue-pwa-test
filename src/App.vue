<template>
    <div id="app" class="wrap">
        <router-view @progress="progress" @loading="loading" />
        <full-loading v-show="showLoading && !showRate"></full-loading>
        <progress-bar v-show="showRate" :rate="rate"></progress-bar>
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
            return this.$store.state;
        },
        updated() {
            // 保存微信 code 和 appid
            this.$store.commit('appCode', this.$route.query);
        },
        computed: {
            showRate () {
                return this.rate > 0 && this.rate < 1;
            }
        },
        methods: {
            progress (rate) {
                this.$store.commit('rate', rate);
            },
            loading (isShow) {
                this.$store.commit('loading', isShow);
            }
        }
    }
</script>

<style src="./assets/css/normalize.less" lang="less"></style>
<style src="./assets/css/global.less" lang="less"></style>
