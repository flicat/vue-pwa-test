<template>
    <div class="wrap" ref="wrap">
        <template v-if="data">
            <header>
                <h1 class="text-clip-2">{{data.title}}</h1>
                <em class="date">{{getDate(data.date)}}</em>
            </header>
            <article v-html="data.content"></article>
        </template>
        <go-top :wrap="$refs.wrap"></go-top>
    </div>
</template>

<script>
    import goTop from '@/widget/goTop';

    export default {
        name: 'articleList',
        props: ['id'],
        components: {
            'go-top': goTop
        },
        created: async function () {
            // 获取数据
            let url = new URL('http://192.168.199.248:2001/data/article-detail.json');
            url.search = 'id=' + this.id;

            let res = await fetch(url);
            let data = await res.json();

            if(data.state === 200) {
                this.data= data.data;
            }
        },
        data () {
            return {
                data: null
            };
        },

        methods: {
            getDate (str) {
                let date = new Date(Number(str) * 1000);
                return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
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
