<template>
    <div class="box">
        <section class="flex">
            <article class="flex-content" ref="wrap">
                <template v-if="userInfo && report && feedback">
                    <div class="report-info">
                        <img class="user-photo" :src="userInfo.headImage" @error="$event.target.src=require('../assets/images/icon-riverer.png')" />
                        <p class="user-name">{{userInfo.name}}</p>
                        <p class="decs">{{report.decs}}</p>
                        <p class="location pull-left">位置：{{report.location}}</p>
                        <p class="date">{{getDate(report.date)}}</p>
                    </div>
                    <div class="album" v-for="src in report.album">
                        <img :src="src" @error="$event.target.src=require('../assets/images/default.png')" alt="">
                    </div>
                    <dl class="feedback">
                        <dt class="title">处理情况：</dt>
                        <dd class="feedback-item" v-for="item in feedback" :key="item.id">
                            <img class="user-photo" :src="item.userInfo.headImage" @error="$event.target.src=require('../assets/images/icon-riverer.png')" />
                            <p class="user-name">{{item.userInfo.name}}</p>
                            <p class="date">{{getDate(item.date)}}</p>
                            <p class="message">{{item.message}}</p>
                        </dd>
                    </dl>

                    <a href="javascript:history.back();" class="btn-back">返回</a>

                </template>
                <div class="box" v-else-if="ready"><span>暂无数据</span></div>
            </article>
        </section>
        <go-top :wrap="getWrap"></go-top>
    </div>
</template>

<script>
    import goTop from '@/widget/goTop';                          // 返回顶部按钮
    import getTimeStr from '@/plugins/time_format.js';           // 时间字符串插件
    import ajax from '@/config/fetch'

    // 获取列表数据
    function getData () {

        ajax.reportInfo({
            data: {
                code: this.$store.state.code,
                appid: this.$store.state.appid,
                id: this.id
            }
        }).then(data => {
            // 数据已经加载完成
            this.ready = true;

            if(data) {
                this.userInfo = data.data.userInfo;
                this.report = data.data.report;
                this.feedback = data.data.feedback;
            }
        });

    }

    export default {
        name: 'myReport',
        props: ['id'],
        components: {
            'go-top': goTop                           // 返回顶部按钮
        },
        beforeMount () {
            this.$emit('loading', !(this.userInfo && this.report && this.feedback || this.ready));
        },
        updated () {
            this.$emit('loading', !(this.userInfo && this.report && this.feedback || this.ready));
        },
        created: getData,                        // 初始化加载数据
        data () {
            return {
                ready: false,                   // 是否加载完成

                userInfo: null,                  // 当前页
                report: null,                  // 每页数量
                feedback: null                // 总页数
            };
        },

        methods: {
            getDate (str) {
                let date = new Date(str);
                return getTimeStr(date);
            },
            getWrap () {
                return this.$refs.wrap;
            }
        }
    };

</script>

<style lang="less" scoped>
    @import "../assets/css/base.less";

    .report-info {
        padding: (30 / @rem) (15 / @rem) 0 (107 / @rem);

        .user-photo {
            position: absolute;
            left: (15 / @rem);
            top: (30 / @rem);
            display: block;
            width: (72 / @rem);
            height: (72 / @rem);
            vertical-align: top;
        }
        p {
            line-height: 1.3em;
            word-break: break-all;
        }
        .user-name {
            font-size: (34 / @rem);
            color: #3f5a6e;
        }
        .decs {
            font-size: (26 / @rem);
            color: #333;
        }

        .location {
            font-size: (28 / @rem);
            color: #0168b7;
            line-height: 2em;
        }
        .date {
            position: absolute;
            right: (15 / @rem);
            top: (40 / @rem);
            font-size: (26 / @rem);
            color: #a6a6a6;
            line-height: 1em;
        }

    }

    .album {
        padding: 0 (15 / @rem);
        img {
            width: 100%;
            height: auto;
            vertical-align: top;
            margin-top: (24 / @rem);
        }
    }

    .feedback {
        padding-top: (10 / @rem);

        .title {
            display: block;
            font-size: (28 / @rem);
            line-height: 2em;
            text-indent: (15 / @rem);
            border-bottom: 1px solid #e5e5e7;
            color: #333333;
        }

        .feedback-item {
            position: relative;
            display: block;
            margin-left: (15 / @rem);
            padding: (22 / @rem) (15 / @rem) (22 / @rem) (90 / @rem);
            border-bottom: 1px solid #e5e5e7;

            &:last-child {
                border-bottom: 0 none;
            }

            .user-photo {
                position: absolute;
                left: 0;
                top: (22 / @rem);
                display: block;
                width: (68 / @rem);
                height: (68 / @rem);
                border: 1px solid #c3c3c3;
                border-radius: 50%;
            }

            .user-name,
            .date {
                font-size: (22 / @rem);
                color: #999999;
                line-height: 1.5em;
            }
            .message {
                word-break: break-all;
                font-size: (24 / @rem);
                color: #333;
                margin-top: 0.3em;
                line-height: 1.4em;
            }
        }

    }

    .btn-back {
        display: block;
        height: (72 / @rem);
        line-height: (72 / @rem);
        text-align: center;
        color: #fff;
        font-size: (30  / @rem);
        margin: 1em (15 / @rem);
        background-color: #cacaca;
        border-radius: 5px;
        text-decoration: none;
    }
</style>
