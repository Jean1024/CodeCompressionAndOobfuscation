import { fetchJSON } from '../../tools'
import URL from '../url'
const DEVICE_CTRL = URL.DEVICE_CTRL

const PARAM = {
    30: 'brightness',
    31: 'chroma',
    32: 'contrast',
    33: 'saturation'
}

export default {
    state: {
        param: {
            brightness: undefined,
            contrast: undefined,
            saturation: undefined,
            chroma: undefined,
        }
    },
    mutations: {
        setDeviceParam(state, param) {
            state.param = param
        }
    },
    actions: {
        controlDevice({state, commit}, {fid, fzid, ip, action, speed, value}) {
            let params = {
                FID: fid,
                FacilityZid: fzid,
                FacilityIP: ip,
                OrederType: action,
            }

            if (action < 9) {
                params.OrederValue1 = speed
                params.OrederValue2 = speed
            }
            if (action >= 30 && action <= 33) {
                let el = PARAM[action]
                params.OrederValue1 = state.param[el]
            }
            if (action === 25 || action === 28) {
                params.OrederValue1 = value
            }
            fetchJSON(DEVICE_CTRL, params)
                .then(data => {
                    if (data.code === 701) {
                        alert('不允许多人同时操作,请稍后再试')
                    }
                })
        },

        getDeviceParam({commit}, {fid}) {
            var url = `${URL.DEVICE_PARAM}?FID=${fid}`
            fetchJSON(url)
                .then(data => {
                    if (data.code === 200) {
                        commit('setDeviceParam', data.list[0])
                    }
                    if (data.code === 257) {
                        commit('setDeviceParam', {
                            speed: 50,
                            brightness: 50,
                            contrast: 50,
                            saturation: 50,
                            chroma: 50,
                        })
                    }
                })

        },

        getDeviceParamInit({state, commit}){
             commit('setDeviceParam', {
                speed: 50,
                brightness: undefined,
                contrast: undefined,
                saturation: undefined,
                chroma: undefined,
            })
        }
    }
}