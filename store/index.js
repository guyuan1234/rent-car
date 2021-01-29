import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/http.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        webConfig:{}, // 网站通用配置
        userInfo:{}, // 用户信息
        commonData:{}, // 公共基本信息
    },
    mutations: {
        // 更新获取用户信息
        updateCommon(state,callback){
            axios({
                url:'/user/commonData'
            }).then((res)=>{
                if(res.code == 0){
                    state.commonData = res.data;
                }
                if(callback){
                    callback()
                } 
            })
        }
    },
    actions: {}
})
export default store