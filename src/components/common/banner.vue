<template>
    <div class="banner">
        <!-- 轮播图插件实现的轮播 -->
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(value, key) in photos" :key="key">
                <img :src="value.img">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
export default {
    name: 'banner',
    props: ["photos"],
    data() {
        return {
            swiperOption: {//swiper的配置项
                pagination:{
                    el:'.swiper-pagination'
                },
                //设置显示容器时显示的数量
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false//操作swiper后不停止切换
                },
                loop: true,//环路
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next',
                spaceBetween: 30
            }
        }
    }
}
</script>

<style lang="less" scoped>
.banner {
    width: 100%;
    height: 350px;
    .swiper-container {
        width: 100%;
        height: 350px;
        .swiper-wrapper img{
            width: 100%;height: 100%;
        }
    }
}
</style>