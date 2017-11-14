import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import App from './views/App'
// import UserList from './views/UserList'
// import DeviceList from './views/DeviceList'
// import VideoShow from './views/VideoShow'
// import Monitor from './views/Monitor'
// import ImageShow from './views/ImageShow'
// import Thumbnail from './views/Thumbnail'
// import LogList from './views/LogList'
// import SystemSetting from './views/SystemSetting'
// import Login from './views/Login'
// import UserInfo from './views/UserInfo'

export default new Router({
    // mode: 'history', //适合配合服务器渲染
    routes: [
        {
            path: '/',
            component: App,
            children: [
                // { path: '', redirect: '/video' },

                // { path: 'user', redirect: '/user/list' },
                // { path: 'user/list', component: UserList },
                // { path: 'user/group', component: UserList },

                // { path: 'device', redirect: '/device/list' },
                // { path: 'device/list', component: DeviceList },
                // { path: 'device/group', component: DeviceList },

                // { path: 'video', redirect: '/video/map' },
                // { path: 'video/map', component: VideoShow },
                // { path: 'video/list', component: VideoShow },
                // { path: 'video/play', component: Monitor },

                // { path: 'image', redirect: '/image/list' },
                // { path: 'image/list', component: ImageShow },
                // { path: 'image/thumbnail', component: Thumbnail },

                // { path: 'log', component: LogList },
                // { path: 'system/setting', component: SystemSetting },

                // { path: 'userInfo', component: UserInfo }
            ]
        },
        // {
        //     path: '/login',
        //     component: Login
        // }
    ]
})