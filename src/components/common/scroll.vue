<template>
    <div class="wrapper" ref="wrapper">
        <ul class="content">
            <div class="newxin" v-if="down">{{ pulldownTip.text }}</div>
            <li>喵喵喵1</li>
            <li>喵喵喵2</li>
            <li>喵喵喵3</li>
            <li>喵喵喵4</li>
            <li>喵喵喵5</li>
            <li>喵喵喵6</li>
            <li>喵喵喵7</li>
            <li>喵喵喵8</li>
            <li>喵喵喵9</li>
            <li>喵喵喵10</li>
            <li>喵喵喵11</li>
            <li>喵喵喵12</li>
            <li>喵喵喵13</li>
            <li>喵喵喵14</li>
            <li>喵喵喵15</li>
            <li>喵喵喵16</li>
            <li>喵喵喵17</li>
            <li>喵喵喵18</li>
            <li>喵喵喵19</li>
            <li>喵喵喵20</li>
            <li>喵喵喵21</li>
            <li>喵喵喵22</li>
            <li>喵喵喵23</li>
            <li>喵喵喵24</li>
            <li>喵喵喵25</li>
            <li>喵喵喵26</li>
            <li>喵喵喵27</li>
            <li>喵喵喵28</li>
            <li>喵喵喵29</li>
            <li>喵喵喵30</li>
            <li>喵喵喵31</li>
            <li>喵喵喵32</li>
            <li>喵喵喵33</li>
            <li>喵喵喵34</li>
            <li>喵喵喵35</li>
            <li>喵喵喵36</li>
            <li>喵喵喵37</li>
            <li>喵喵喵38</li>
            <li>喵喵喵39</li>
            <li>喵喵喵40</li>
            <li>喵喵喵41</li>
            <li>喵喵喵42</li>
            <li>喵喵喵43</li>
            <li>喵喵喵44</li>
            <li>喵喵喵45</li>
            <li>喵喵喵46</li>
            <li>喵喵喵47</li>
            <li>喵喵喵48</li>
            <li>喵喵喵49</li>
            <div class="newxin" v-if="up">{{ pulldownTip.textup }}</div>
        </ul>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    data() {
        return {
            loadingConnecting: false,
            down: false,
            up: true,
            pulldownTip: {
                text: '下拉刷新', // 松开立即刷新
                textup: '上拉加载更多', // 松开立即刷新
                rotate: '' // icon-rotate
            }
        };
    },
    mounted() {
        setTimeout(() => {
            this.BS();
        }, 20);
    },
    watch: {
        // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
        data() {
            setTimeout(() => {
                this.BS();
            }, this.refreshDelay);
        }
    },
    methods: {
        BS() {
            if (!this.$refs.wrapper) {
                return;
            }
            // better-scroll的初始化
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX
            });
            console.log(this.scroll);
            this.scroll.on('scroll', pos => {
                console.log(pos.y);
                //如果下拉超过50px 就显示下拉刷新的文字
                if (pos.y > 50) {
                    this.pulldownTip.text = "放手刷新"
                    this.down = true
                } else {
                    this.down = false
                }
            });
            // touchEnd 通过这个方法来监听下拉刷新
            this.scroll.on('touchEnd', pos => {
                // 下拉动作
                if (pos.y > 50) {
                    console.log('下拉刷新成功');
                    console.log('这里执行你方法');
                    this.down = false;
                }
                if (this.scroll.maxScrollY > pos.y + 10) {
                    console.log('加载更多');
                    //使用refresh 方法 来更新scroll  解决无法滚动的问题
                    this.scroll.refresh();
                }
                console.log(this.scroll.maxScrollY + '总距离----下拉的距离' + pos.y);
            });
            console.log(this.scroll.maxScrollY);
        }
    },
    props: {
        /**
         * 1 滚动的时候会派发scroll事件，会截流。
         * 2 滚动的时候实时派发scroll事件，不会截流。
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        probeType: {
            type: Number,
            default: 3
        },
        /**
         * 点击列表是否派发click事件
         */
        click: {
            type: Boolean,
            default: true
        },
        /**
         * 是否开启横向滚动
         */
        scrollX: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发滚动事件
         */
        listenScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 列表的数据
         */
        data: {
            type: Array,
            default: null
        },
        /**
         * 是否派发滚动到底部的事件，用于上拉加载
         */
        pullup: {
            type: Boolean,
            default: true
        },
        /**
         * 是否派发顶部下拉的事件，用于下拉刷新
         */
        pulldown: {
            type: Boolean,
            default: true
        },
        /**
         * 是否派发列表滚动开始的事件
         */
        beforeScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 当数据更新后，刷新scroll的延时。
         */
        refreshDelay: {
            type: Number,
            default: 20
        }
    }
}

    ;
</script>
<style>
.wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
}

.wrapper .content {
    width: 100%;
}

.wrapper .content li {
    background-color: #ffffff;
    width: 100%;
    height: 66px;
    text-align: center;
    line-height: 66px;
    border-bottom: solid 1px #f0f0f0;
}
/* 刷新 */

.newxin {
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: red;
}
</style>