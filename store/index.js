import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/plugins/http.js'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        webConfig: {}, // 网站通用配置
        userInfo: {}, // 用户信息
        commonData: {}, // 公共基本信息
        all_list: [{
                pagePath: '/pages/tabbar/rent-car/rent-car',
                iconPath: '/static/images/icon/tabbar-1.png',
                selectedIconPath: '/static/images/icon/tabbar-1-s.png',
                text: '租车',
            },
            {
                pagePath: '/pages/tabbar/put-up/put-up',
                iconPath: '/static/images/icon/tabbar-2.png',
                selectedIconPath: '/static/images/icon/tabbar-2-s.png',
                text: '住宿',
            },
            {
                pagePath: '/pages/tabbar/salary-earner/salary-earner',
                iconPath: '/static/images/icon/tabbar-3.png',
                selectedIconPath: '/static/images/icon/tabbar-3-s.png',
                text: '雇工',
            },
            {
                pagePath: '/pages/tabbar/preson-center/preson-center',
                iconPath: '/static/images/icon/tabbar-4.png',
                selectedIconPath: '/static/images/icon/tabbar-4-s.png',
                text: '我的',
            },
        ],
        list: [],
    },
    mutations: {
        // 更新获取用户信息
        updateCommon(state, callback) {
            axios({
                url: '/user/commonData'
            }).then((res) => {
                if (res.code == 0) {
                    state.commonData = res.data;
                }
                if (callback) {
                    callback()
                }
            })
        },
        getUser(state, data) {
            axios({
                url: '/user/projectMember',
                data: {
                    pid: data.pid
                }
            }).then((res) => {
                if (res.code == 0) {
                    state.commonData.user = res.data;
                }
                if (data.callback) {
                    data.callback()
                }
            })
        },
        setingAuth(state, type) {
            if (type == 1) {
                state.list = JSON.parse(JSON.stringify(state.all_list))
            } else {
                let list = JSON.parse(JSON.stringify(state.all_list))
                state.list = [list[2], list[3]]
            }
        },
    },
    actions: {}
})
export default store