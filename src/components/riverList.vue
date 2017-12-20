<template>
    <div class="box">
        <header>
            <h1>地图信息</h1>
        </header>

        <section class="search-wrap">
            <div class="form-control">
                <input type="text" class="river-name" placeholder="请输入河流名称">
            </div>
            <div class="form-control">
                <div class="label row">
                    <span class="placeholder col-3">县级</span>
                    <span class="result col-9">大埔县</span>
                </div>
                <select name="county" class="cover">
                    <option value="" disabled>请选择</option>
                    <option value="大埔县">大埔县</option>
                </select>
            </div>
            <div class="form-control">
                <div class="label row">
                    <span class="placeholder col-3">镇级</span>
                    <span class="result col-9">大埔镇</span>
                </div>
                <select name="town" class="cover">
                    <option value="" disabled>请选择</option>
                    <option value="大埔县">大埔镇</option>
                </select>
            </div>
            <div class="form-control">
                <div class="label row">
                    <span class="placeholder col-3">村级</span>
                    <span class="result col-9">大埔村</span>
                </div>
                <select name="village" class="cover">
                    <option value="" disabled>请选择</option>
                    <option value="大埔县">大埔村</option>
                </select>
            </div>
        </section>

        <ul class="tab-title row">
            <li class="tab-item col-6 current">所有河湖</li>
            <li class="tab-item col-6">附近河湖</li>
        </ul>

        <section class="flex">
            <div class="flex-content">
                <ul class="river-list">
                    <li class="river-item">
                        <a href="" class="row">
                            <p class="photo col-2"><img src="../assets/images/pic-item.jpg" alt=""></p>
                            <p class="name col-9">浈江大埔区段</p>
                            <p class="favorite col-1 active"></p>
                        </a>
                    </li>
                    <li class="river-item">
                        <a href="" class="row">
                            <p class="photo col-2"><img src="../assets/images/pic-item.jpg" alt=""></p>
                            <p class="name col-9">浈江大埔区段</p>
                            <p class="favorite col-1"></p>
                        </a>
                    </li>
                    <li class="river-item">
                        <a href="" class="row">
                            <p class="photo col-2"><img src="../assets/images/pic-item.jpg" alt=""></p>
                            <p class="name col-9">浈江大埔区段</p>
                            <p class="favorite col-1"></p>
                        </a>
                    </li>
                    <li class="river-item">
                        <a href="" class="row">
                            <p class="photo col-2"><img src="../assets/images/pic-item.jpg" alt=""></p>
                            <p class="name col-9">浈江大埔区段</p>
                            <p class="favorite col-1"></p>
                        </a>
                    </li>
                    <li class="river-item">
                        <a href="" class="row">
                            <p class="photo col-2"><img src="../assets/images/pic-item.jpg" alt=""></p>
                            <p class="name col-9">浈江大埔区段</p>
                            <p class="favorite col-1"></p>
                        </a>
                    </li>
                    <li class="river-item">
                        <a href="" class="row">
                            <p class="photo col-2"><img src="../assets/images/pic-item.jpg" alt=""></p>
                            <p class="name col-9">浈江大埔区段</p>
                            <p class="favorite col-1"></p>
                        </a>
                    </li>
                    <li class="river-item">
                        <a href="" class="row">
                            <p class="photo col-2"><img src="../assets/images/pic-item.jpg" alt=""></p>
                            <p class="name col-9">浈江大埔区段</p>
                            <p class="favorite col-1"></p>
                        </a>
                    </li>
                    <li class="river-item">
                        <a href="" class="row">
                            <p class="photo col-2"><img src="../assets/images/pic-item.jpg" alt=""></p>
                            <p class="name col-9">浈江大埔区段</p>
                            <p class="favorite col-1"></p>
                        </a>
                    </li>
                    <li class="river-item">
                        <a href="" class="row">
                            <p class="photo col-2"><img src="../assets/images/pic-item.jpg" alt=""></p>
                            <p class="name col-9">浈江大埔区段</p>
                            <p class="favorite col-1"></p>
                        </a>
                    </li>
                </ul>
                <loading></loading>
            </div>
        </section>
    </div>
</template>

<script>
    import Loading from '@/widget/loading';

    export default {
        name: 'mapInfo',
        components: {
            'loading': Loading
        },
        data: function() {
            return {

            };
        },

        methods: {

        }
    }

</script>


<style lang="less" scoped>
    @import "../assets/css/base.less";

    .box {
        background-color: #f6f6f6;
    }
    header {
        box-sizing: border-box;
        width: 100%;
        padding: 0 (15 / @rem);
        height: (90 / @rem);
        line-height: (90 / @rem);
        background-color: #0168b7;

        h1 {
            color: #fff;
            font-size: (40 / @rem);
            margin: 0;
        }
    }

    .search-wrap {
        box-sizing: border-box;
        width: 100%;
        padding: (26 / @rem) (15 / @rem) 0;

        .form-control {
            position: relative;
            margin-bottom: (25 / @rem);

            input.river-name {
                box-sizing: border-box;
                width: 100%;
                height: (73 / @rem);
                line-height: (73 / @rem);
                border-radius: 10px;
                background: #fff;
                border: 1px solid #d7d7d7;
                text-align: center;
                font-size: (28 / @rem);

                &::placeholder {
                    display: inline-block;
                    color: #b1b1b1;
                    padding-left: (40 / @rem);
                    background: url(../assets/images/icon-search.png) no-repeat 35% 50%;
                    background-size: (26 / @rem);
                }
            }

            .label {
                position: relative;
                box-sizing: border-box;
                width: 100%;
                height: (86 / @rem);
                padding-left: (16 / @rem);
                padding-right: (180 / @rem);
                line-height: (86 / @rem);
                background-color: #fff;
                font-size: (32 / @rem);
                color: #000;

                &::before {
                    position: absolute;
                    right: (26 / @rem);
                    top: 0;
                    content: '请选择 >';
                    color: #bbb;
                }

                .result {
                    color: #bbb;
                    text-align: right;
                }
            }

            .cover {
                position: absolute;
                left: 0;
                top: 0;
                z-index: 999;
                display: block;
                width: 100%;
                height: 100%;
                opacity: 0;
            }
        }


    }

    .tab-title {
        box-sizing: border-box;
        padding: 0 (15 / @rem);
        background-color: #fff;
        border-radius: 8px 8px 0 0;

        .tab-item {
            height: (82 / @rem);
            line-height: (82 / @rem);
            text-align: center;
            color: #0168b7;
            border: 1px solid #0168b7;
            background-color: #f7f7f7;

            &:first-child {
                border-top-left-radius: 8px;
            }
            &:last-child {
                border-top-right-radius: 8px;
            }

            &.current {
                background-color: #0168b7;
                color: #fff;
            }
        }

    }

    .river-list {
        padding: 0 (15 / @rem);
        background-color: #fff;

        .river-item {
            padding: (20 / @rem) 0;
            border-bottom: 1px solid #e5e5e7;
            font-size: (32 / @rem);

            &:last-child {
                border-bottom: 0 none;
            }

            p {
                line-height: (68 / @rem);
                height: (68 / @rem);
            }

            .photo {

                img {
                    width: auto;
                    max-width: 100%;
                    height: (68 / @rem);
                    vertical-align: top;
                }
            }

            .name {
                color: #333;
            }

            .favorite {
                background: url(../assets/images/icon-star-gray.png) no-repeat 50% 50%;
                background-size: (33 / @rem) (31 / @rem);

                &.active {
                    background-image: url(../assets/images/icon-star.png);
                }
            }

        }
    }
</style>
