<template>
    <div class="search">
        <my-head :msg="searchMsg"></my-head>
        <div class="search-info">
            <input type="search" placeholder="请输入关键字" @input="inputChange" @keyup.enter="sousuo" v-model="searchWord">
            <p @click="sousuo">搜</p>
        </div>
        <div class="search-list" v-if="showList">
            <ul>
                <router-link tag="li" :to="`/player/${item.song_id}`" v-for="(item, index) in songlist" :key="index">
                    <span class="list-title" v-html="item.title"></span>
                    <span class="list-author">{{item.author}}</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import myHead from './common/myheader'
export default {
    name: 'search',
    components: { myHead },
    data() {
        return {
            searchMsg: "音乐搜索",
            searchWord: "",
            searchText: "",
            songlist: [],
            showList: false
        }
    },
    methods: {
        inputChange() {
            if (this.searchWord.replace(/(^\s*)|(\s*$)/g, '') == "") {
                this.showList = false;
                return;
            }//值为空，退出
            if (this.searchWord !== '') {
                this.showList = true;
                this.searchText = this.searchWord;
                this.getAjaxContnt();
            }
        },
        sousuo() {
            this.searchText = this.searchWord;
            this.getAjaxContnt();
        },
        getAjaxContnt() {
            this.axios({
                method: 'get',
                url: 'api/v1/restserver/ting',
                params: {
                    from: 'qianqian',
                    version: '2.1.0',
                    method: 'baidu.ting.search.common',
                    format: 'json',
                    query: this.searchText,
                    page_no: 1,
                    page_size: 30
                }
            }).then((res) => {
                // console.log(res.data);
                this.songlist = res.data.song_list;
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    created() {
        this.$store.dispatch('AchangeNavBar', true);
    }
}
</script>

<style lang="less" scoped>
.search {
    width: 100%;
    height: 100vh;
    background-color: skyblue;
    position: relative;
    .search-info {
        width: 70%;
        height: 80px;
        border-radius: 50px;
        position: absolute;
        top: 25vw;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        input {
            width: 100%;
            box-sizing: border-box;
            padding-right: 100px;
            text-indent: 30px;
            font-size: 28px;
            border-radius: 50px;
        }
        p {
            width: 80px;
            height: 100%;
            border-radius: 50%;
            line-height: 80px;
            text-align: center;
            font-size: 36px;
            background-color: #ccc;
            position: absolute;
            right: 0;
        }
    }
    .search-list {
        width: 80%;
        height: 65vh;
        color: white;
        border-radius: 16px;
        position: absolute;
        top: 40vw;
        left: 50%;
        transform: translateX(-50%);
        box-sizing: border-box;
        padding: 16px 10px;
        ul {
            width: 100%;
            height: 100%;
            overflow-x: hidden;
            li {
                display: flex;
                justify-content: space-around;
                font-size: 30px;
                margin: 16px 0;
                .list-title {
                    width: 60%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .list-author {
                    width: 30%;
                    text-align: right;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>