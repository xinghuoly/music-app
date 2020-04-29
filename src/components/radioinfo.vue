<template>
    <div class="radioinfo">
        <my-head class="myheader" :msg="radioInfoMsg"></my-head>
        <div class="wrapper" ref="wrapper">
            <div class="content">
                <div class="newxin" v-if="down">{{ pulldownTip.text }}</div>
                <dl v-for="(item, index) in list" v-if="item.songid != null" :key="index">
                    <dt><img @click="play(item.songid)" :src="item.thumb" alt="" /></dt>
                    <dd>
                        <p>{{ item.title }}</p>
                        <p>演唱者: {{ item.artist }}</p>
                    </dd>
                </dl>
                <div class="newxin loading-hook" v-if="up">{{ pulldownTip.text }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import myHead from './common/myheader'
import BScroll from 'better-scroll'
export default {
    name: 'radioinfo',
    components: { myHead },
    data() {
        return {
            radioInfoMsg: "电台歌曲",
            cname: "",
            list: [],
            down: false,
            up: true,
            pulldownTip: {
                text: '加载中！！！', // 松开立即刷新
            }
        }
    },
    methods: {
        play(id) {
            if (id == null) return;
            this.$router.push('/player/' + id);
        },
        loadData() {
            var self = this;
            this.axios({
                method: 'get',
                url: '/api/v1/restserver/ting',
                params: {//get传参
                    from: 'qianqian',
                    version: '2.1.0',
                    method: 'baidu.ting.radio.getChannelSong',
                    format: 'json',
                    pn: 0,
                    rn: 10,
                    channelname: self.cname     //----上个页面传来的电台名称
                }
            }).then((res) => {
                // console.log(res.data);
                // this.list = res.data.result.songlist
                this.list = res.data.result.songlist.concat(this.list)
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.wrapper, {
                            probeType: 3,
                            scrollX: false,
                            scrollY: true,
                            click: true,
                            pullUpLoad: {
                                threshold: -30, // 负值是当上拉到超过低部 30px；正值是距离底部距离时，
                            }
                        })
                        // console.log(this.scroll);
                        this.scroll.on('scroll', pos => {
                            //如果下拉超过50px 就显示下拉刷新的文字
                            if (pos.y > 50) {
                                this.pulldownTip.text = "放手刷新"
                                this.down = true;
                            } else {
                                this.down = false
                            }
                        });
                        // touchEnd 通过这个方法来监听下拉刷新
                        this.scroll.on('touchEnd', pos => {
                            // 下拉动作
                            if (pos.y > 50) {
                                // console.log('下拉刷新成功');
                                // console.log('这里执行你方法');
                                this.down = false;
                                self.list = [];
                                self.loadData();
                            }
                        });
                        // console.log(this.scroll.maxScrollY);
                        //上拉加载 总高度 > 下拉的高度 + 数值(10仅供参考) 触发加载更多
                        // if (this.scroll.maxScrollY > pos.y + 10) {
                        //     //使用refresh 方法 来更新scroll 解决无法滚动的问题
                        //     if (this.isMorePage) {  //判断是否有下一页
                        //         this.pullUp = true  //显示上拉提示组件
                        //         this.page++
                        //         this.getPostList().then(res => { //调用接口，处理数据
                        //             this.pullUp = false
                        //             this.list = this.list.concat(res.list)
                        //             this.scroll.refresh()  //刷新插件!!!!!这个挺重要的！别忘了。不然会一卡一卡
                        //         })
                        //     }
                        // }
                        //})
                        this.scroll.on('pullingUp', (pos) => {
                            document.querySelector('.loading-hook').innerText = '加载中...';
                            setTimeout(function () {
                                // 恢复文本值
                                document.querySelector('.loading-hook').innerText = '加载更多...';
                                // 向列表添加数据
                                self.loadData();
                            }, 1000);
                        })
                    } else {
                        this.scroll.finishPullUp()
                        this.scroll.refresh()
                    }
                })
            })
        }
    },
    created() {
        this.$store.dispatch('AchangeNavBar', true);
        var data = this.$route.query.cname;
        this.cname = decodeURIComponent(data);
    },
    mounted() {
        this.loadData();
        // this.axios({
        //     method: 'get',
        //     url: '/api/v1/restserver/ting',
        //     params: {//get传参
        //         from: 'qianqian',
        //         version: '2.1.0',
        //         method: 'baidu.ting.radio.getChannelSong',
        //         format: 'json',
        //         pn: 0,
        //         rn: 10,
        //         channelname: this.cname     //----上个页面传来的电台名称
        //     }
        // }).then((res) => {
        //     // console.log(res.data);
        //     this.songObj = res.data;
        // }).catch((err) => {
        //     console.log(err);
        // });
    },
}
</script>

<style lang="less" scoped>
.radioinfo {
    display: flex;
    flex-direction: column;
    .myheader {
        height: 90px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
    }
    .wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        overflow: hidden;
        .content {
            width: 100%;
            padding: 100px 0;
            box-sizing: border-box;
            dl {
                width: 100%;
                height: 240px;
                padding: 15px 35px;
                box-sizing: border-box;
                border-bottom: 2px solid rgb(116, 115, 115);
                display: flex;
                align-items: center;
                dt {
                    width: 200px;
                    height: 200px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                dd {
                    width: 300px;
                    margin-left: 35px;
                    font-size: 25px;
                    p {
                        padding: 35px 0;
                    }
                    p:first-child {
                        font-weight: bold;
                        font-size: 35px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
            .newxin {
                width: 100%;
                height: 50px;
                color: white;
                text-align: center;
                line-height: 50px;
                background-color: palevioletred;
            }
        }
    }
}
</style>