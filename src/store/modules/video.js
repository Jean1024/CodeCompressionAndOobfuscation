import { fetchJSON } from '../../tools'
import URL from '../url'

export default {
    state: {
        mapShowArr: [],
        listShowGroup: [],
        listShowArr: [],
        count: 0,
    },
    mutations: {
        initMapShowArr(state, list) {
            state.mapShowArr = list
        },
        initListShowGroup(state, list) {
            state.listShowGroup = list
        },
        initListShowArr(state, list) {
            state.listShowArr = list
        },
        initVideoListCount(state, count) {
            state.count = count
        }
    },
    actions: {
        getVideoMapArr({commit}) {
            fetchJSON(URL.VIDEO_MAP)
                .then(data => {
                    if (data.code === 200) {
                        commit('initMapShowArr', data.list)
                    }
                })
        },

        getVideoShowArr({commit}, {pagerow = 15, intpage = 1} = {}) {
            var url = `${URL.VIDEO_LIST}?pagerow=${pagerow}&intpage=${intpage}`
            fetchJSON(url)
                .then(data => {
                    if (data.code === 200) {
                        commit('initListShowArr', data.list)
                        commit('initVideoListCount', data.count)
                    } else if (data.code === 2000) {
                        commit('initListShowGroup', data.list)
                        commit('initVideoListCount', data.count)
                    }
                })
        },

        // 获取组内设备
        getVideoShowSubGroup({commit}, {groupid, pagerow = 10, intpage = 1}) {
            commit('initListShowArr', [])
            commit('initVideoListCount', 0)

            var url = `${URL.VIDEO_GROUP}?FZID=${groupid}&pagerow=${pagerow}&intpage=${intpage}`
            fetchJSON(url)
                .then(data => {
                    if (data.code === 200) {
                        commit('initListShowArr', data.list)
                        commit('initVideoListCount', data.count)
                    }
                })
        }
    }
}