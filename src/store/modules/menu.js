import { fetchJSON } from '../../tools'
import URL from '../url'

export default {
    state: {
        list: []
    },
    mutations: {
        initMenu(state, list) {
            state.list = list
        }
    },
    actions: {
        getMenu({commit}) {
            let url = `${URL.MENU}?${Date.now()}`
            fetchJSON(url)
                .then(data => {
                    if (data.code === 200) {
                        commit('initMenu', data.list)
                    }
                })

        }
    },
}