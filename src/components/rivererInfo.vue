<template>
    <div class="box">
        <section class="flex">
            <div class="flex-content">
                <div class="riverer-info">
                    <p class="name" :data-title="shortName(uname)">{{uname}}<i class="icon-sex" :class="[sexName]"></i></p>
                    <p class="title">{{dname}}</p>
                </div>
                <ul class="contact">
                    <!--<li class="contact-item">-->
                        <!--<p class="label address">住址</p>-->
                        <!--<p class="content">{{address}}</p>-->
                    <!--</li>-->
                    <li class="contact-item">
                        <p class="label tel">办公电话</p>
                        <p class="content">{{tel}}</p>
                    </li>
                    <li class="contact-item">
                        <p class="label email">邮箱</p>
                        <p class="content">{{email}}</p>
                    </li>
                </ul>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: 'rivererInfo',
        data () {
            return this.$route.query;
        },
        computed: {
            sexName () {
                return ['female', 'male'][Number(this.sex)]
            }
        },
        methods: {
            // 名字截取
            shortName (name) {
                return String(name).substr(-2);
            }
        }
    };
</script>

<style lang="less" scoped>
    @import "../assets/css/base.less";

    .flex-content {
        box-sizing: border-box;
        padding: (48 / @rem) (15 / @rem) 0;
        background: url(../assets/images/bg-riverer-top.svg) no-repeat 0 0;
        background-size: 100%;

        .riverer-info {
            height: (420 / @rem);
            background: url(../assets/images/bg-riverer-layer-1.svg) no-repeat 0 100%,
            url(../assets/images/bg-riverer-layer-2.svg) no-repeat 0 100%;
            background-size: 100%;
            background-color: #fff;
            box-shadow: 0 1px 50px rgba(0, 0, 0, .1);

            p {
                text-indent: (40 / @rem);
            }

            .name {
                position: relative;
                padding-top: 0.6em;
                font-size: (42 / @rem);
                color: #333;
                line-height: 2em;

                &::after {
                    content: attr(data-title);
                    position: absolute;
                    left: (603 / @rem);
                    top: (28 / @rem);
                    display: block;
                    width: (82 / @rem);
                    height: (82 / @rem);
                    line-height: (82 / @rem);
                    text-align: center;
                    font-size: (28  / @rem);
                    color: #fff;
                    border-radius: 9999px;
                    background-color: #0168b7;
                    overflow: hidden;
                    text-indent: 0;
                }

                .icon-sex {
                    display: inline-block;
                    width: (29 / @rem);
                    height: (29 / @rem);
                    margin-left: 0.5em;
                    background: url(../assets/images/icon-male.png) no-repeat 50% 50% #d4d4d4;
                    background-size: 50%;
                    border-radius: 50%;
                }
            }
            .title {
                font-size: (34 / @rem);
                color: #acacac;
            }
        }

        .contact {
            .contact-item {
                padding: (32 / @rem) 0 (16 / @rem);
                border-bottom: 1px solid #e5e5e7;

                .label {
                    font-size: (28 / @rem);
                    color: #666;
                    text-indent: (50  /@rem);
                    height: (38 / @rem);
                    line-height: (38 / @rem);

                    &.address {
                        background: url(../assets/images/icon-riverer-address.png) no-repeat 0 0;
                        background-size: auto 100%;
                    }
                    &.tel {
                        background: url(../assets/images/icon-riverer-tel.png) no-repeat 0 0;
                        background-size: auto 100%;
                    }
                    &.email {
                        background: url(../assets/images/icon-riverer-email.png) no-repeat 0 0;
                        background-size: auto 100%;
                    }
                }
                .content {
                    font-size: (40 / @rem);
                    color: #333;
                    line-height: 2em;
                }
            }
        }

    }
</style>
