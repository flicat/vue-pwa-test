<template>
    <div class="wrap" ref="wrap">
        <template v-if="data">
            <header>
                <h1 class="text-clip-2">{{data.title}}</h1>
                <em class="date">{{getDate(data.date)}}</em>
            </header>
            <article v-html="data.content"></article>
        </template>
        <div class="box" v-else-if="ready"><span>暂无数据</span></div>
        <go-top :wrap="getWrap"></go-top>
    </div>
</template>

<script>
    import goTop from '@/widget/goTop';
    import ajax from '@/config/fetch'

    export default {
        name: 'articleList',
        props: ['id'],
        components: {
            'go-top': goTop
        },
        beforeMount () {
            this.$emit('loading', !(this.data || this.ready));
        },
        updated () {
            this.$emit('loading', !(this.data || this.ready));
        },
        created () {

            ajax.articleDetail({
                data: {
                    code: this.$store.state.code,
                    appid: this.$store.state.appid,
                    accountId: this.$route.query.accountId || '',
                    articleId: this.id
                }
            }).then(data => {
                // 数据已经加载完成
                this.ready = true;

                if(data) {
                    this.data= data.data;
                }
            });

        },
        data () {
            return {
                ready: false,                   // 是否加载完成
                data: null
            };
        },

        methods: {
            getDate (str) {
                let date = new Date(Number(str));
                return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
            },
            getWrap () {
                return this.$refs.wrap;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    @import "../assets/css/base.less";

    header {
        padding: (15 / @rem);
        background-color: #0168b7;

        h1 {
            font-size: (34 / @rem);
            line-height: 1.2em;
            color: #fff;
            margin: 0;
        }

        .date {
            font-size: (24 / @rem);
            margin-top: 1em;
            color: #d1ebff;
            font-style: normal;
        }
    }

    article {
        padding: (25 / @rem) (15 / @rem) 0;
        font-size: (28 / @rem) !important;
        color: #333;

        /deep/ img {
            max-width:  100% !important;
            height: auto !important;
            vertical-align: top !important;
        }

        /deep/ figure {
            margin: 0;
        }

        /deep/ figcaption {
            text-align: center !important;
            font-size: (24 / @rem) !important;
            color: #666;
        }
    }

</style>
