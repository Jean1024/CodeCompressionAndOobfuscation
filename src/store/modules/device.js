import { fetchJSON } from '../../tools'
import URL from '../url'

export default {
    state: {
        list: [],
        groupList: [],
        count: 0,
        zuList: [], //设备录入使用
    },
    mutations: {
        initDeviceList(state, list) {
            state.list = list
        },
        initDeviceGroupList(state, list) {
            state.groupList = list
        },
        initDeviceCount(state, count) {
            state.count = count
        },
        initDeviceZuList(state, list) {
            state.zuList = list
        },
    },
    actions: {
        getDeviceList({commit}, {pagerow = 10, intpage = 1} = {}) {
            var url = `${URL.DEVICE_LIST}?pagerow=${pagerow}&intpage=${intpage}`
            fetchJSON(url)
                .then(data => {
                    if (data.code === 200 || data.code === 2000) {
                        commit('initDeviceList', data.list)
                        commit('initDeviceCount', data.count)
                    }
                })
        },

        getDeviceGroupList({commit}, {pagerow = 10, intpage = 1, isGroupLeader = false} = {}) {
            var url = `${URL.DEVICE_GROUP_LIST}?pagerow=${pagerow}&intpage=${intpage}`
            fetchJSON(url)
                .then(data => {
                    if (data.code === 200 || data.code === 2000) {
                        commit('initDeviceGroupList', data.list)
                        commit('initDeviceCount', data.count)
                        if (isGroupLeader) {
                            let out = data.list.map(el=>{
                                return {
                                    Fzid: el.Fzid,
                                    Fzname: el.fzname
                                }
                            })
                            commit('initDeviceZuList', out)
                        }
                    }
                })
        },

        inputDevice({state, commit}, device) {
            let {fzid, number, model, province, city, county, location, longitude, dimensionality, altitude, keyBoarder, erectTime, deadline, ip, url, type, id, urlApp, urlTes, urlAppWithin, urlWithin} = device

            return new Promise(resolve => {
                let params = {
                    Fzid: fzid,
                    FacilityNumber: number,
                    FacilityModel: model,
                    Province: province,
                    City: city,
                    County: county,
                    Location: location,
                    Longitude: longitude,
                    Dimensionality: dimensionality,
                    Altitude: altitude,
                    KeyBoarder: keyBoarder,
                    ErectTime: erectTime,
                    FacilityDeadline: deadline,
                    FacilityIP: ip,
                    FacilityUrl: url,
                    FaciliType: +type,
                    FacilityID: id,
                    FacilityUrlApp: urlApp,
                    FacilityUrlTes: urlTes,
                    FacilityUrlAppWithin: urlAppWithin,
                    FacilityUrlWithin: urlWithin,
                }

                fetchJSON(URL.INPUT_DEVICE, params)
                    .then(data => {
                        if (data.code === 200) {
                            // 设备添加成功后，插入到表格最前。
                            // Fid:"1a599494f3de4401ba746bbc2ec46437"
                            // FType:"0"
                            // Fzname:"许英杰_2设备组"
                            // Level:"00"
                            params.Fid = data.Fid
                            state.zuList.forEach(el => {
                                if (el.Fzid === params.Fzid) {
                                    params.Fzname = el.Fzname
                                }
                            })
                            params.FType = '0'

                            commit('initDeviceList', [params, ...state.list])
                            resolve()
                        } else {
                            resolve(data.reason)
                        }
                    })
            })
        },

        // 只有管理员有权限
        getDeviceZuList({rootState, commit, dispatch}) {
            // 组长新建设备需要使用getDeviceGroupList来获取组设备id
            if (rootState.session.detail.UserAuthority == 1) {
                dispatch('getDeviceGroupList', { isGroupLeader: true })
            } else {
                fetchJSON(URL.DEVICE_ZU_LIST)
                    .then(data => {
                        if (data.code === 200) {
                            commit('initDeviceZuList', data.list)
                        }
                    })
            }
        },

        updateDeviceInfo({state, commit}, device) {
            let {fid, number, model, province, city, county, location, longitude, dimensionality, altitude, keyBoarder, erectTime, deadline, ip, url, type, id, urlApp, urlTes, urlAppWithin, urlWithin} = device

            return new Promise(resolve => {
                let params = {
                    Fid: fid,
                    FaciliType: +type,
                    FacilityNumber: number,
                }

                if (model !== undefined) {
                    Object.assign(params, {
                        FacilityModel: model,
                        Province: province,
                        City: city,
                        County: county,
                        Location: location,
                        Longitude: longitude,
                        Dimensionality: dimensionality,
                        Altitude: altitude,
                        KeyBoarder: keyBoarder,
                        ErectTime: erectTime,
                        FacilityDeadline: deadline,
                        FacilityIP: ip,
                        FacilityUrl: url,
                        FacilityID: id,
                        FacilityUrlApp: urlApp,
                        FacilityUrlTes: urlTes,
                        FacilityUrlAppWithin: urlAppWithin,
                        FacilityUrlWithin: urlWithin,
                    })
                }

                fetchJSON(URL.UPDATE_DEVICE, params)
                    .then(data => {
                        if (data.code === 200) {
                            let list = state.list.map(el => {
                                if (el.Fid === fid) {
                                    return Object.assign({}, el, params)
                                } else {
                                    return el
                                }
                            })
                            commit('initDeviceList', list)
                            resolve()
                        } else {
                            resolve(data.reason)
                        }
                    })
            })
        },

        disableDevice({ dispatch, state }, id) {
            let device = state.list.find(el => el.Fid === id)
            dispatch('updateDeviceInfo', {
                fid: id,
                type: 1,
                number: device.FacilityNumber
            })
        },
        enableDevice({ dispatch, state }, id) {
            let device = state.list.find(el => el.Fid === id)
            dispatch('updateDeviceInfo', {
                fid: id,
                type: 0,
                number: device.FacilityNumber
            })
        },

        deleteDeviceByFid({commit, state}, {fid}) {
            return new Promise(resolve => {
                let url = `${URL.DELETE_DEVICE}?Fid=${fid}`
                fetchJSON(url)
                    .then(data => {
                        if (data.code === 200) {
                            let list = state.list.filter(item => item.Fid !== fid)
                            commit('initDeviceList', list)
                            resolve()
                        }
                    })
            })
        }
    }
}