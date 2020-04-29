<template>
    <div class="navbar" v-if="$store.state.navbarFlag">
        <ul>
            <li>
                <router-link to="/home"><i class="iconfont iconhome"></i>首页</router-link>
            </li>
            <li>
                <router-link to="/search"><i class="iconfont iconsearch"></i>搜索</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'navbar',
    data() {
        return {

        }
    }
}
</script>

<style lang="less" scoped>
.router-link-active {
    color: white;
}
.navbar {
    width: 100%;
    height: 100px;
    background: #c0494b;
    position: fixed;
    bottom: 0;
    left: 0;
    ul {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
            font-size: 24px;
            list-style: none;
            a{
                display: flex;
                flex-direction: column;
                align-items: center;
                .iconhome,.iconsearch{
                    font-size: 40px;
                    margin-bottom: 10px;
                }
            }
        }
    }
}
</style>