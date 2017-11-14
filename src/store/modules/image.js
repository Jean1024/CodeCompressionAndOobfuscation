import { fetchJSON } from '../../tools'
import URL from '../url'

export default {
    state: {
        list: [],
        small: [],
    },
    mutations: {
        setImageList(state, data) {
            state.list = data.list
            state.small = data.small
        }
    },
    actions: {
        getImageList({commit}, {fid}) {
            // clear
            commit('setImageList', [])

            var url = `${URL.IMAGE_LIST}?fid=${fid}`
            fetchJSON(url)
                .then(data => {
                    if (data.code === 200) {
                        commit('setImageList', data)
                    }
                })
        }
    }
}