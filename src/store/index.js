import Vue from 'vue'
import Vuex from 'vuex'

import session from './modules/session'
import menu from './modules/menu'
import video from './modules/video'
import ctrl from './modules/ctrl'
import user from './modules/user'
import device from './modules/device'
import image from './modules/image'
import log from './modules/log'

Vue.use(Vuex)

var store = new Vuex.Store({
    modules: {
        session,
        menu,
        video,
        ctrl,
        user,
        device,
        image,
        log,
    }
})

export default store
