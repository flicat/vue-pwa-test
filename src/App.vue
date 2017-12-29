<template>
    <div id="app" class="wrap">
        <router-view/>
        <full-loading v-show="loading"></full-loading>
    </div>
</template>

<script>
    import FullLoading from '@/widget/full-loading';
    import store from '@/vuex';

    export default {
        name: 'app',
        store,
        components: {
            'full-loading': FullLoading
        },
        props: ['loading'],
        updated() {
            // 保存微信 code 和 appid
            this.$store.commit('appCode', this.$route.query);
        }
    }
</script>

<style src="./assets/css/normalize.less" lang="less"></style>
<style src="./assets/css/global.less" lang="less"></style>
