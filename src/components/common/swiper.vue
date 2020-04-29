<template>
    <div class="photo-player"><!-- 手写的轮播图 -->
        <ul class="photo-player-lists">
            <li v-for="(value, key) in photos" v-if="key==index" :key="key"><img :src="value.img" /></li>
        </ul>
        <ul class="photo-player-button">
            <li v-for="(value, key) in photos" :class="['white', {'active': key == index}]" @click="index = key" :key="key"></li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            index: 0
        }
    },
    props: ["photos"],
    methods: {
        change() {
            let that = this;
            let len = this.photos.length;
            setInterval(function () {
                that.index++;
                if (that.index == len) {
                    that.index = 0;
                }
            }, 3500);
        }
    },
    mounted() {
        this.change();
    }
}
</script>

<style lang="less" scoped>
.photo-player {
    width: 100%;
    height: 350px;
    overflow: hidden;
    position: relative;
    .photo-player-lists img {
        width: 100%;
        height: 100%;
    }
    .photo-player-button {
        position: absolute;
        margin: 0;
        padding: 0;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        li {
            width: 16px;
            height: 16px;
            margin:0 10px;
            border-radius: 50%;
            float: left;
        }
    }
}
.white {
    background: #ffffff;
}
.active {
    background: #0000ff;
}
</style>

