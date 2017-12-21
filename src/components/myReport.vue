<template>
    <div class="box">
        <section class="flex">
            <article class="flex-content" ref="wrap">
                <ul class="report-list" v-if="userInfo && list && list.length">
                    <li class="report-item" v-for="item in list" :key="item.id">
                        <img class="user-photo" :src="userInfo.headImage" />
                        <p class="user-name">{{userInfo.name}}</p>
                        <p class="decs">{{item.decs}}</p>
                        <p class="album clear" v-if="item.album && item.album.length">
                            <img v-for="src in item.album" :src="src" alt="">
                        </p>
                        <p class="location">位置：{{item.location}}</p>
                        <p class="date">{{getDate(item.date)}}</p>
                        <i class="state" :class="{active: item.state==='process', done: item.state==='done'}"></i>
                    </li>
                </ul>
                <div class="box" v-else-if="ready"><span>暂无数据</span></div>
                <full-loading v-else></full-loading>
            </article>
        </section>
        <loading @load="getData" :wrap="$refs.wrap"></loading>
        <go-top :wrap="$refs.wrap"></go-top>
    </div>
</template>

<script>
    import Loading from '@/widget/loading';
    import FullLoading from '@/widget/full-loading';             // loading遮罩
    import goTop from '@/widget/goTop';

    // 获取数据
    async function getData (callback) {
        this.pageIndex++;

        if(!this.pageTotal || this.pageIndex < this.pageTotal) {

            let url = new URL('http://192.168.199.248:2001/data/my-report.json');
            url.search = [
                ['pageIndex', this.pageIndex].join('='),
                ['pageIndex', this.pageIndex].join('=')].join('&');

            url.searchParams.append('pageIndex', this.pageIndex);
            url.searchParams.append('pageSize', this.pageSize);

            let res = await fetch(url);
            let data = await res.json();

            // 数据已经加载完成
            this.ready = true;

            callback && callback();

            if(data.state === 200) {
                this.userInfo = data.data.userInfo;
                this.pageTotal= data.data.report.pageTotal;

                if(Array.isArray(this.list)) {
                    this.list = this.list.concat(data.data.report.list);
                } else {
                    this.list = data.data.report.list;
                }
            } else {
                alert('没有更多数据！');
            }

        } else {
            callback && callback();
            alert('没有更多数据！');
        }

    }

    export default {
        name: 'myReport',
        components: {
            'loading': Loading,
            'full-loading': FullLoading,               // loading遮罩
            'go-top': goTop
        },
        created: getData,
        data () {
            return {
                ready: false,                   // 是否加载完成
                userInfo: null,
                list: null,

                pageIndex: 0,
                pageSize: 10,
                pageTotal: null
            };
        },

        methods: {
            getData,
            getDate (str) {
                let date = new Date(Number(str) * 1000);
                return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
            }
        }
    };

</script>

<style lang="less" scoped>
    @import "../assets/css/base.less";

    .report-list {
        padding-left: (15 / @rem);

        .report-item {
            position: relative;
            padding: (30 / @rem) (105 / @rem) (30 / @rem) (92 / @rem);
            border-bottom: 1px solid #e5e5e7;

            &:last-child {
                border-bottom: 0 none;
            }

            .user-photo {
                position: absolute;
                left: 0;
                top: (30 / @rem);
                display: block;
                width: (72 / @rem);
                height: (72 / @rem);
                vertical-align: top;
            }

            p {
                line-height: 1.3em;
            }
            .user-name {
                font-size: (34 / @rem);
                color: #3f5a6e;
            }
            .decs {
                font-size: (28 / @rem);
                color: #333;
            }

            .album {
                margin: (10 / @rem) 0;

                img {
                    float: left;
                    width: (174 / 538 * 100%);
                    height: auto;
                    margin-left: (8 / 538 * 100%);

                    &:nth-child(3n-2) {
                        margin-left: 0;
                    }

                    &:nth-child(n+4) {
                        margin-top: (8 / 538 * 100%);
                    }
                }
            }

            .location {
                font-size: (26 / @rem);
                color: #0168b7;
                line-height: 1.5em;
            }
            .date {
                font-size: (26 / @rem);
                color: #a6a6a6;
                line-height: 1em;
            }

            .state {
                position: absolute;
                right: (15 / @rem);
                top: (30 / @rem);
                display: block;
                width: (102 / @rem);
                height: (60 / @rem);

                &.active {
                    background: url(../assets/images/icon-state-active.png) no-repeat 0 0;
                    background-size: 100%;
                }

                &.done {
                    background: url(../assets/images/icon-state-done.png) no-repeat 0 0;
                    background-size: 100%;
                }
            }

        }
    }


</style>
