import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

const state = {
    navbarFlag:false    //控制脚部是否显示
}
const mutations = {     //改变navbar状态
    changeNavBar(state,flag){
        state.navbarFlag = flag;
    }
}
const actions = {
    AchangeNavBar(context,flag){
        context.commit("changeNavBar",flag);
    }
}
const getters = {

}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})