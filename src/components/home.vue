<template>
    <div class="home">
        <my-head :msg="homeMsg"></my-head>
        <!-- <my-swiper :photos="sliders"></my-swiper> -->
        <my-banner :photos="sliders"></my-banner>
        <div class="navlist">
            <dl>
                <dt><i class="iconfont iconmusic1"></i></dt>
                <dd><a href="javascript:;" class="active">最新歌曲</a></dd>
            </dl>
            <dl>
                <dt><i class="iconfont iconSongListgedan"></i></dt>
                <dd><a href="javascript:;">歌单</a></dd>
            </dl>
            <dl>
                <dt><router-link to="/radiolist"><i class="iconfont iconbar-graph"></i></router-link></dt>
                <dd><a href="javascript:;">电台</a></dd>
            </dl>
            <dl>
                <dt><i class="iconfont iconMicrophone-"></i></dt>
                <dd><a href="javascript:;">歌手</a></dd>
            </dl>
        </div>
        <!-- <nav-bar></nav-bar> -->
    </div>
</template>

<script>
import myHead from './common/myheader'
// import navBar from './common/navbar'
// import mySwiper from './common/swiper'
import myBanner from './common/banner'
export default {
    name: 'home',
    components: {
        myHead,
        // navBar,
        // mySwiper,
        myBanner
    },
    data() {
        return {
            homeMsg: "音乐播放器",
            sliders: [
                {
                    img: 'http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658'
                },
                {
                    img: 'http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658'
                },
                {
                    img: 'http://img.hb.aicdn.com/ab7f48509b3c0353017d9a85ef1d12400c9b2724540d4-p3zouo_fw658'
                }
            ],
        }
    },
    created() {
        this.$store.dispatch('AchangeNavBar',true);
    },
}
</script>

<style lang="less" scoped>
.home .navlist {
    width: 100%;
    height: 260px;
    border-bottom: 3px solid #f7f7f7;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    dl {
        width: 140px;
        height: 180px;
        dt {
            width: 140px;
            height: 140px;
            border-radius: 50%;
            border: 5px solid #ff7070;
            display: flex;
            justify-content: center;
            align-items: center;
            i.iconmusic1,i.iconSongListgedan,i.iconbar-graph,i.iconMicrophone-,{
                font-size: 60px;
            }
        }
        dd {
            padding: 10px 0;
            a {
                color: #1a9fb7;
            }
            .active {
                color: black;
            }
        }
    }
}
</style>