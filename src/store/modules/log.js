import { fetchJSON } from '../../tools'
import URL from '../url'

export default {
    state: {
        list: [],
        count: 0
    },

    mutations: {
        initLogList(state, {list, count}) {
            state.list = list
            state.count = count
        }
    },

    actions: {
        getLogList({commit}, {type = 0, logType = undefined, pagerow = 10, intpage = 1} = {}) {

            var url = `${URL.LOG_LIST}?Type=${type}&pagerow=${pagerow}&intpage=${intpage}`

            if (logType !== undefined) {
                url = `${url}&LogType=${logType}`
            }

            fetchJSON(url)
                .then(data => {
                    if (data.code === 200) {
                        commit('initLogList', {
                            list: data.list,
                            count: data.count
                        })
                    }
                })
        }
    }
}