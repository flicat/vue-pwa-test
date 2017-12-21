<template>
    <div id="app" class="wrap">
        <router-view/>
        <full-loading v-show="loading"></full-loading>
    </div>
</template>

<script>
    import FullLoading from '@/widget/full-loading';

    export default {
        name: 'app',
        components: {
            'full-loading': FullLoading
        },
        props: ['loading']
    }
</script>

<style src="./assets/css/normalize.css"></style>
<style src="./assets/css/global.less" lang="less"></style>
