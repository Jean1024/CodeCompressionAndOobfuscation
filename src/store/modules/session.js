import { fetchJSON } from '../../tools'
import URL from '../url'

var detail = localStorage.getItem('user-detail')
detail = detail ? JSON.parse(detail) : {
    UserName: ''
}
var isAdmin = localStorage.getItem('admin')
isAdmin = isAdmin === '1' ? true : false

var isAdmin2 = localStorage.getItem('admin2')
isAdmin2 = isAdmin2 === '1' ? true : false

export default {
    state: {
        isAdmin,
        detail,
        isAdmin2
    },
    mutations: {
        initUserDetail(state, detail) {
            state.detail = detail
        },
        setAdmin(state, bool) {
            state.isAdmin = bool
        },
        setAdmin2(state, bool) {
            state.isAdmin2 = bool
        }
    },
    actions: {
        signin({ commit }, user) {
            let params = {
                UserNo: user.name,
                UserPwd: user.password
            }
            fetchJSON(URL.SIGN_IN, params)
                .then(data => {
                    if (data.code === 200 || data.code === 2000) {
                        console.log(data)
                        if (data.code === 2000) {
                            commit('setAdmin', true)
                            localStorage.setItem('admin', 1)
                        } else {
                            localStorage.setItem('admin', 0)
                        }

                        if (data.list.UserAgent === '1' && data.list.UserCode === '999') {
                            commit('setAdmin2', true)
                            localStorage.setItem('admin2', '1')
                        } else {
                            localStorage.setItem('admin2', '0')
                        }
                        
                        commit('initUserDetail', data.list)

                        // 刷新时保留用户信息
                        localStorage.setItem('user-detail', JSON.stringify(data.list))
                        location.replace('#/')
                    } else {
                        location.replace(`#/login?err=${data.reason}`)
                    }
                })
        },

        signout() {
            fetchJSON(URL.SIGN_OUT)
                .then(data => {
                    if (data.code === 200) {
                        localStorage.clear()

                        location.replace('#/login')
                        // 刷新以清空 vuex
                        location.reload()
                    }
                })

        }
    }
}