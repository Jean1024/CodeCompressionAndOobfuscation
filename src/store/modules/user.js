import { fetchJSON } from '../../tools'
import URL from '../url'

export default {
    state: {
        list: [],
        leaderList: [], // for create user
        groupList: [],
        count: 0
    },
    mutations: {
        initUserList(state, list) {
            state.list = list
        },
        initLeaderList(state, list) {
            state.leaderList = list
        },
        initUserGroupList(state, list) {
            state.groupList = list
        },
        initUserCount(state, count) {
            state.count = count
        }
    },
    actions: {
        getUserList({commit}, {pagerow = 10, intpage = 1} = {}) {
            var url = `${URL.USER_LIST}?pagerow=${pagerow}&intpage=${intpage}`
            fetchJSON(url)
                .then(data => {
                    if (data.code === 200 || data.code === 2000) {
                        commit('initUserList', data.list)
                        commit('initUserCount', data.count)
                    }
                })
        },

        getUserGroupList({commit}, {pagerow = 10, intpage = 1} = {}) {
            var url = `${URL.USER_GROUP_LIST}?pagerow=${pagerow}&intpage=${intpage}`
            fetchJSON(url)
                .then(data => {
                    if (data.code === 200 || data.code === 2000) {
                        commit('initUserGroupList', data.list)
                        commit('initUserCount', data.count)
                    }
                })
        },

        createUser({commit, state}, user) {
            let {no, passwd, type, name, agent, phone, email, zID} = user

            return new Promise((resolve) => {
                let params = {
                    UserNo: no,
                    UserPwd: passwd,
                    UserType: +type,
                    UserName: name,
                    UserAgent: +agent,
                    UserPhone: phone,
                    UserMail: email,
                    ZID: zID,
                }
                fetchJSON(URL.CREAT_USER, params)
                    .then(data => {
                        if (data.code == 200) {
                            params.UserID = data.UserID
                            state.leaderList.forEach(el => {
                                if (el.ZID === params.ZID) {
                                    params.Zname = el.Zname
                                }
                            })
                            params.UserPwd = ''
                            commit('initUserList', [params, ...state.list])

                            resolve()
                        } else {
                            resolve(data.reason)
                        }
                    })
            })
        },

        getLeaderList({commit}) {
            fetchJSON(URL.LEADER_LIST)
                .then(data => {
                    if (data.code === 200) {
                        commit('initLeaderList', data.list)
                    }
                })
        },

        updateUserInfo({commit, state}, user) {
            let {no, passwd, type, name, agent, phone, email, userId} = user

            return new Promise((resolve) => {
                let params = {
                    UserID: userId,
                    UserType: +type
                }
                if (no) {
                    Object.assign(params, {
                        UserNo: no,
                        UserName: name,
                        UserAgent: +agent,
                        UserPhone: phone,
                        UserMail: email,
                    })
                }
                if (passwd) {
                    params.UserPwd = passwd
                }
                fetchJSON(URL.UPDATE_USER, params)
                    .then(data => {
                        if (data.code === 200) {
                            let list = state.list.map(el => {
                                if (el.UserID === userId) {
                                    return Object.assign({}, el, params, {UserPwd: ''})
                                } else {
                                    return el
                                }
                            })
                            commit('initUserList', list)

                            resolve()
                        } else {
                            resolve(data.reason)
                        }
                    })
            })
        },

        disableUser({ dispatch, state }, id) {
            dispatch('updateUserInfo', {
                userId: id,
                type: 1,
            })
        },
        enableUser({ dispatch, state }, id) {
            dispatch('updateUserInfo', {
                userId: id,
                type: 0,
            })
        },

        deleteUserById({commit, state}, {userId}) {
            return new Promise(resolve => {
                let params = {
                    UserID: userId
                }
                fetchJSON(URL.DELETE_USER, params)
                    .then(data => {
                        if (data.code === 200) {
                            let list = state.list.filter(item => item.UserID !== userId)
                            commit('initUserList', list)
                            resolve()
                        }
                    })
            })
        },

        createLeader({commit, state}, leader) {
            let {no, passwd, type, name, agent, phone, email, zName, zType} = leader

            return new Promise((resolve) => {
                let params = {
                    UserNo: no,
                    UserPwd: passwd,
                    UserType: +type,
                    UserName: name,
                    UserAgent: +agent,
                    UserPhone: phone,
                    UserMail: email,
                    Zname: zName,
                    ZType: +zType,
                }

                fetchJSON(URL.CREAT_LEADER, params)
                    .then(data => {
                        if (data.code == 200) {
                            let group = {
                                ZID: data.ZID,
                                zname: params.Zname,
                                userName: params.UserName,
                                userMail: params.UserMail,
                                userPhone: params.UserPhone,
                                roleName: '组长',
                            }
                            commit('initUserGroupList', [group, ...state.groupList])

                            resolve()
                        } else {
                            resolve(data.reason)
                        }
                    })
            })
        },

        updateLeader({commit, state}, leader) {
            let {zID, zName, zType} = leader

            return new Promise((resolve) => {
                let params = {
                    ZID: zID
                }
                if (zName) {
                    params.Zname = zName
                } else {
                    params.ZType = zType
                    
                }

                fetchJSON(URL.UPDATE_LEADER, params)
                    .then(data => {
                        if (data.code === 200) {
                            let groupList = state.groupList.map(el => {
                                if (el.ZID === zID) {
                                    if (zName) {
                                        // 列表返回组名 key 是 zname；修改传参的组名 key 是 Zname
                                        params.zname = zName
                                    }
                                    return Object.assign({}, el, params)
                                } else {
                                    return el
                                }
                            })
                            commit('initUserGroupList', groupList)

                            resolve()
                        } else {
                            resolve(data.reason)
                        }
                    })
            })
        },

        disableLeader({ dispatch, state }, id) {
            dispatch('updateLeader', {
                zID: id,
                zType: 1,
            })
        },
        enableLeader({ dispatch, state }, id) {
            dispatch('updateLeader', {
                zID: id,
                zType: 0,
            })
        },
    }
}