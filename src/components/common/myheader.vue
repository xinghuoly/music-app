<template>
    <div class="myhead">
        <ul>
            <li><i class="iconfont icontime"></i>消息</li>
            <li>{{msg}}</li>
            <li><i class="iconfont iconcart2f"></i>购物车</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'myhead',
    props:["msg"],
    data() { 
        return {
            
        }
    }
}
</script>

<style lang="less" scoped>
    .myhead{
        width: 100%;
        height: 90px;
        background-color: #c0494b;
        box-sizing: border-box;
        padding: 0 20px;
        font-weight: bold;
        color: white;
        ul{
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            li:nth-child(2){
                font-size: 30px;
            }
            li:not(:nth-child(2)){
                display: flex;
                flex-direction: column;
                align-items: center;
                .icontime,.iconcart2f{
                    font-size: 35px;
                    margin-bottom: 5px;
                }
            }
        }
    }
</style>