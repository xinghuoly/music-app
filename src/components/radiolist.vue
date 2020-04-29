<template>
  <div class="radiolist">
    <my-head :msg="radioMsg"></my-head>
    <div class="list" v-for="(val, key) in listdata" :key="key">
      <h1>{{ val.title }}</h1>
      <dl v-for="(item, index) in val.channellist" :key="index">
        <dt>
          <img
            @click="toinfo(item.ch_name)"
            :src="item.thumb ? item.thumb : item.avatar"
            alt=""
          />
        </dt>
        <dd>{{ item.name }}</dd>
      </dl>
      <dl
        class="placeholder"
        v-for="val in parseInt(
          (val.channellist.length + 1) /
            (val.channellist.length > 0 ? val.channellist.length / 2 : 4)
        )"
        :key="val.id"
      ></dl>
    </div>
  </div>
</template>

<script>
import myHead from "./common/myheader";
export default {
  name: "radiolist",
  components: { myHead },
  data() {
    return {
      radioMsg: "电台列表",
      listdata: {}
    };
  },
  methods: {
    toinfo(value) {
      if (value == null) return;
      let val = encodeURIComponent(value);
      this.$router.push("/radioinfo?cname=" + val);
    }
  },
  created() {
    this.$store.dispatch("AchangeNavBar", true);
    this.axios({
      method: "get",
      url: "/api/v1/restserver/ting",
      params: {
        //get传参
        from: "qianqian",
        version: "2.1.0",
        method: "baidu.ting.radio.getCategoryList",
        format: "json"
      }
    })
      .then(res => {
        // console.log(res.data.result);
        this.listdata = res.data.result;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="less" scoped>
.radiolist {
  width: 100%;
  margin-bottom: 100px;
  .wrapper {
    height: 1340px;
  }
  h1 {
    width: 100%;
    padding: 10px;
    font-size: 32px;
    font-weight: bold;
  }
  .list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    text-align: center;
    dl {
      width: 28%;
      padding: 10px 0;
      dt {
        width: 100%;
        height: 200px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      dd {
        color: #0e9ab4;
        font-size: 24px;
        padding: 5px 0;
      }
    }
    dl.placeholder {
      content: "";
      height: 0;
      padding: 0;
    }
  }
}
</style>
