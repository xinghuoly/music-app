<template>
    <div class="songplayer" v-if="songObj">
        <ul class="song-title">
            <li><i @click="back" class="iconfont">&#59057;</i></li>
            <li class="title-name">{{ songObj.songName }}</li>
            <li><i @click="todiantai" class="iconfont">&#58910;</i></li>
        </ul>
        <div class="song-info">
            <p class="song-author">演唱者: {{ songObj.artistName }}</p>
            <p class="song-from">{{ songObj.albumName }}</p>
        </div>
        <div class="song-bg">
            <img :src="songObj.songPicRadio ? songObj.songPicRadio : ''" alt="" />
        </div>
        <!-- 歌词 -->
        <div class="song-lrc">
            <div class="hasLrc" :style="{ top: -marginTop + 'px' }">
                <div v-for="(item, index) in storyContent" :key="index">
                    <p :class="currentIndex == index ? 'currentTime' : ''">{{ item[1] }}</p>
                </div>
            </div>
            <!-- <div class="noLrc" v-else>暂无歌词....</div> -->
        </div>
        <div class="song-bar">
            <div class="progressbar" @click="playMusic" ref="runfatbar">
                <div class="greenbar" ref="runbar">
                    <span class="yuan" draggable="true" ref="yuanCtrl"></span>
                </div>
            </div>
        </div>
        <div class="time-text">{{ cTime }}</div>
        <div class="right-time time-text">{{ songObj.time | ltime }}</div>
        <ul class="song-ctrl">
            <li><i class="iconfont">&#59063;</i></li>
            <li>
                <i v-if="!play" @click="playbtn" class="iconfont pbtn">&#58928;</i>
                <i v-else @click="playbtn" class="iconfont pbtn">&#59056;</i>
            </li>
            <li><i class="iconfont">&#59065;</i></li>
            <li><i @click="reset" class="iconfont">&#58964;</i></li>
        </ul>
        <audio ref="player" :src="songObj.songLink"></audio>
    </div>
</template>

<script>
export default {
    name: 'songplayer',
    props: ["songid"],
    data() {
        return {
            songObj: {},
            cTime: '00:00', // 已播放时间
            play: false, // 播放暂停按钮,
            lrc: "",      //歌词数据
            storyContent: [],//歌词数组，转化完成用来在wxml中使用
            marginTop: 0,//文稿滚动距离
            currentIndex: 0,//当前正在第几行
            muCurrentTime: '',//获得正在播放的时长
            showLrc:false
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        todiantai() {
            this.$router.push('/radiolist');
        },
        playbtn() {
            this.play = !this.play;
            let music = this.$refs.player;
            if (this.play) {
                music.play() // 播放音乐
            } else {
                music.pause() // 暂停音乐
            }
        },
        playMusic(e) {
            let music = this.$refs.player // 音频所在对象
            let barWidth = (e.pageX - 15) / this.$refs.runfatbar.offsetWidth // 计算点击位置相对父元素总宽的比例
            this.$refs.runbar.style.width = `${barWidth * 100}%` // 进度条应所在的比例总宽
            music.currentTime = music.duration * barWidth // 计算点击时应播放所在的时间
            music.play() // 播放音频
            this.play = true // 更改播放暂停按钮为播放
        },
        reset(e) {
            let music = this.$refs.player // 音频所在对象
            music.load() // 播放音频
            this.$refs.runbar.style.width = "0%" // 进度条应所在的比例总宽
            music.play() // 播放音频
            this.storyContent = [];
            this.marginTop = 0;
            this.currentIndex = 0;
            this.muCurrentTime = '';
            this.getSong();
            this.audioPlayLrc(this.muCurrentTime);
            this.play = true // 更改播放暂停按钮为播放
        },
        getSong() {
            this.axios({
                method: 'get',
                url: '/info/data/music/fmlink',
                params: {//get传参
                    rate: '320',
                    songIds: this.songid,//动态歌曲id
                    type: ''
                }
            }).then((res) => {
                // console.log(res.data.data.songList);
                this.songObj = res.data.data.songList[0];
                const url = res.data.data.songList[0].lrcLink;
                this.getLrc(url).then(res => {
                    // console.log(res.data);
                    this.storyContent = this.parseLyric(res.data);
                })
            }).catch((err) => {
                console.log(err);
            });
        },
        getLrc(url) {    //获取歌词的请求
            return this.axios({
                method: 'get',
                url: url,
            })
        },
        parseLyric(lrc1) {
            // if (!lrc1) {
            //     return;
            // }
            const result = [];
            var lines = lrc1.split('\n'),//切割每一行
                pattern = /\[\d{2}:\d{2}.\d{2}\]/g; //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
            //去掉不含时间的行
            while (!pattern.test(lines)) {
                lines = lines.slice(1);
            };
            //上面用'\n'生成数组时，结果中最后一个为空元素，这里将去掉
            lines[lines.length - 1].length === 0 && lines.pop();
            if (lines) {
                for (const v in lines) {
                    if (lines.hasOwnProperty(v)) {
                        const ele = lines[v];
                        var time = ele.match(pattern), value = ele.replace(pattern, '');//提取歌词
                        // console.log(value);
                        // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
                        for (const v1 in time) {
                            if (time.hasOwnProperty(v1)) {
                                const el = time[v1];
                                var t = el.slice(1, -1).split(':');//去掉时间里的中括号得到xx:xx.xx
                                //将结果压入最终数组
                                result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
                            }
                        }
                    }
                }
                // lines.forEach(function (v, i, a) {     /*数组元素值*/   /*元素索引*/   /*数组本身*/
                //     //提取出时间[xx:xx.xx]
                //     var time = v.match(pattern),
                //         //提取歌词
                //         value = v.replace(pattern, '');
                //     // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
                //     time.forEach(function (v1, i1, a1) {
                //         //去掉时间里的中括号得到xx:xx.xx
                //         var t = v1.slice(1, -1).split(':');
                //         //将结果压入最终数组
                //         result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
                //     });
                // });
            }
            //最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
            result.sort(function (a, b) {
                return a[0] - b[0];
            });
            return result;
        },
        audioPlayLrc(time) {
            if (this.currentIndex >= 4) {//超过6行开始滚动
                this.marginTop = (this.currentIndex - 2) * 20;
            }
            if (!this.storyContent) {
                return;
            }
            // 文稿对应行颜色改变
            if (this.currentIndex != this.storyContent.length - 1) {//
                var j = 0;
                for (j = this.currentIndex; j < this.storyContent.length; j++) {
                    // 当前时间与前一行，后一行时间作比较， j:代表当前行数
                    if (this.currentIndex == this.storyContent.length - 2) {
                        //最后一行只能与前一行时间比较
                        if (parseFloat(time) > parseFloat(this.storyContent[this.storyContent.length - 1][0])) {
                            this.currentIndex = this.storyContent.length - 1;
                            return;
                        }
                    } else {
                        this.currentIndex = 0;//初始化播放时间
                        if (parseFloat(time) > parseFloat(this.storyContent[j][0]) && parseFloat(time) < parseFloat(this.storyContent[j + 1][0])) {
                            this.currentIndex = j;
                            return;
                        }
                    }
                }
            }
            // console.log(this.storyContent);
        }
    },
    watch: {
        muCurrentTime: function (val, newval) {
            this.audioPlayLrc(newval);
        }
    },
    created() {
        this.$store.dispatch('AchangeNavBar', false);
        this.getSong();
    },
    mounted() {
        let self = this;//保存this指向
        let music = this.$refs.player  // 音频所在对象
        let musicBar = this.$refs.runbar  // 颜色进度条所在对象
        let yuanbtn = this.$refs.yuanCtrl  //进度条拖动按钮
        let musicWidth = this.$refs.runfatbar.offsetWidth // 底部进度条总宽

        //自动播放函数
        music.addEventListener('loadstart', () => {
            music.play();
            this.play = true;
        })
        // 获得音频正在播放时的处理
        music.addEventListener('timeupdate', () => {
            let musicTime = music.duration // 获得音频时长
            let stopTime = music.currentTime // 获得已播放的音频时长
            self.muCurrentTime = stopTime;
            musicBar.style.width = `${(stopTime / musicTime) * 100}%` // 计算进度条所在比例宽度
            let branch = Math.floor(stopTime / 60) // 计算已播放的音频分钟
            let second = Math.floor(stopTime % 60) // 计算已播放的音频秒
            if (branch < 10 && second < 10) { // 四种情况判断显示音频以播放时间
                this.cTime = `0${branch}:0${second}`
            } else if (branch < 10) {
                this.cTime = `0${branch}:${second}`
            } else if (second < 10) {
                this.cTime = `${branch}:0${second}`
            } else {
                this.cTime = `${branch}:${second}`
            }
            if (stopTime == musicTime) {
                this.play = false;
            }
        })

        // 监听颜色进度条是否触摸拖动
        musicBar.addEventListener('touchmove', (event) => {
            let events = event.targetTouches[0].pageX // 获得触摸拖动的距离
            musicBar.style.width = `${((events - 20) / musicWidth) * 100}%` // 计算进度条所在比例宽度
            music.pause() // 触摸拖动时停止播放
        })
        // 监听颜色进度条是否触摸拖动结束
        yuanbtn.addEventListener('touchend', () => {
            let touwidth = (musicBar.offsetWidth / musicWidth) // 计算进度条所在比例
            music.currentTime = music.duration * touwidth // 通过所在比例赋值给音频应在的播放时间
            music.play() // 根据播放时间开始播放
            this.play = true // 更改播放暂停按钮为播放
        })
    },
    filters: {
        ltime: function (value) {
            if (!value) return ''
            let theTime = parseInt(value);// 秒
            let middle = 0;// 分
            if (theTime > 60) {
                middle = parseInt(theTime / 60);
                theTime = parseInt(theTime % 60);
                if (middle > 60) {
                    middle = parseInt(middle % 60);
                }
            }
            let m = middle < 10 ? "0" + middle : middle;
            let s = theTime < 10 ? "0" + theTime : theTime;
            return `${m}:${s}`;
        }
    }
}
</script>

<style lang="less" scoped>
.songplayer {
    width: 100%;
    height: 100vh;
    background-color: rgba(80, 93, 110, 0.4);
    .song-title {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 50px 20px 0;
        font-size: 40px;
        font-weight: bold;
        .title-name {
            width: 60%;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        i {
            font-weight: normal;
            font-size: 45px;
        }
    }
    .song-info {
        width: 100%;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
        p {
            padding: 10px 0;
            &.song-author {
                font-size: 30px;
                color: #105782;
            }
            &.song-from {
                font-style: italic;
            }
        }
    }
    .song-bg {
        width: 65vw;
        height: 65vw;
        border: 10px solid rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        margin: 50px auto;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .song-lrc {
        width: 65vw;
        height: 200px;
        position: absolute;
        top: 105vw;
        left: 50%;
        transform: translateX(-50%);
        overflow-x: hidden;
        text-align: center;
        .hasLrc {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            transition: top 0.5s linear;
            p {
                height: 40px;
                line-height: 40px;
                font-size: 28px;
            }
        }
        .noLrc{
            width: 100%;
            height: 100%;
            line-height: 200px;
            color: red;
            font-weight: bold;
            font-size: 40px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        .currentTime {
            color: red;
        }
    }
    .song-bar {
        width: 90%;
        height: 30px;
        line-height: 30px;
        margin: 240px auto 0;
        .progressbar {
            width: 100%;
            height: 20px;
            background-color: #999;
            border-radius: 30px;
            position: relative;
            .greenbar {
                width: 0%;
                height: 20px;
                border-radius: 30px;
                position: absolute;
                top: 0;
                left: 0;
                background-color: #1296db;
                .yuan {
                    display: inline-block;
                    padding: 10px;
                    background-color: #fff;
                    border-radius: 50%;
                    position: absolute;
                    top: 0px;
                    right: -10px;
                }
            }
        }
    }
    .time-text {
        display: inline-block;
        width: 50%;
        padding: 0 30px;
        box-sizing: border-box;
    }
    .right-time {
        text-align: right;
        float: right;
    }
    .song-ctrl {
        widows: 100%;
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 50px;
        li i {
            font-size: 60px;
        }
        li i.pbtn {
            font-size: 80px;
            font-weight: bold;
        }
        li:last-child i {
            color: red;
            font-size: 45px;
        }
        li:not(:last-child) i {
            color: #0ba9d6;
        }
    }
}
</style>