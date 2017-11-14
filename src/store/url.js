// 文档： https://gitlab.tianqi.cn/wangxinyu/tianqixy/wikis/home

let SITE = 'https://tqwy.tianqi.cn/tianqixy'

if (process.env.NODE_ENV !== 'production') {
    SITE = '/tianqixy'
}


// 登录 {UserNo, UserPwd}
const SIGN_IN = `${SITE}/logininfo`

// 退出登录
const SIGN_OUT = `${SITE}/userInfo/remove`

// 修改密码 {UserID, UserPwd, UPUserPwd}
// const CHANGE_PASSWD = 

// 重置密码 just for admin {UserID}
// 

// 菜单查询
const MENU = `${SITE}/userInfo/selusermenu`

// 地图展示查询
const VIDEO_MAP = `${SITE}/userInfo/selmallf`

// 列表展示查询（如果是管理员则返回组信息） {pagerow, intpage}
const VIDEO_LIST = `${SITE}/userInfo/selectlist`

// 根据组查询组内设备 {FZID, pagerow, intpage}
const VIDEO_GROUP = `${SITE}/userInfo/selectlistzu`

// 设备操作指令接口 {FID, FacilityZid, FacilityIP, OrederType, OrederValue1, OrederValue2}
const DEVICE_CTRL = `${SITE}/userInfo/facilordeinset`

// 获取设备饱和度等数据 {FID}
const DEVICE_PARAM = `${SITE}/userInfo/obtain`

// 获取天气要素 {FID}
const WEATHER_ELEMENT = `${SITE}/userInfo/tqys`

// 人员管理接口，用户列表 TODO
const USER_LIST = `${SITE}/userInfo/seluser`

// 人员组管理接口，组列表 {pagerow, intpage}
const USER_GROUP_LIST = `${SITE}/userInfo/selzuuser`

// 建立用户 {...}
const CREAT_USER = `${SITE}/userInfo/inseuser`

// 修改用户信息 {...}
const UPDATE_USER = `${SITE}/userInfo/updateuser`

// 删除用户 {UserID}
const DELETE_USER = `${SITE}/userInfo/deleuser`

// 获取组长列表
const LEADER_LIST = `${SITE}/userInfo/selectzulist`

// 建立组长 leader {...}
const CREAT_LEADER = `${SITE}/userInfo/addusers`

// 修改组长信息 leader {...}
const UPDATE_LEADER = `${SITE}/userInfo/updateuserzu`

// 设备管理接口，设备列表 {pagerow, intpage}
const DEVICE_LIST = `${SITE}/userInfo/selfacility`

// 设备组管理接口，组列表
const DEVICE_GROUP_LIST = `${SITE}/userInfo/selzufacility`

// 设备录入（管理员才拥有操作权限） {...}
const INPUT_DEVICE = `${SITE}/userInfo/faciliadd`

// 获取设备组列表 设备录入使用
const DEVICE_ZU_LIST = `${SITE}/userInfo/selectfailizulist`

// 根据设备fid获取设备信息
// const DEVICE_INFO = `${SITE}/userInfo/Fidselet`

// 设备信息修改 {...}
const UPDATE_DEVICE = `${SITE}/userInfo/faciliup`

// 设备删除（管理员才拥有操作权限） {Fid}
const DELETE_DEVICE = `${SITE}/userInfo/delefacili`

// 获取图集 {fid}
const IMAGE_LIST = `${SITE}/userInfo/getpngs`

// 获取日志 {Type, LogType, pagerow, intpage}
const LOG_LIST = `${SITE}/userInfo/LogOrder`

export default {
    SIGN_IN,
    SIGN_OUT,
    MENU,
    VIDEO_MAP,
    VIDEO_LIST,
    VIDEO_GROUP,
    DEVICE_CTRL,
    DEVICE_PARAM,
    WEATHER_ELEMENT,

    USER_LIST,
    USER_GROUP_LIST,
    CREAT_USER,
    UPDATE_USER,
    DELETE_USER,
    LEADER_LIST,
    CREAT_LEADER,
    UPDATE_LEADER,

    DEVICE_LIST,
    DEVICE_GROUP_LIST,
    INPUT_DEVICE,
    DEVICE_ZU_LIST,
    // DEVICE_INFO,
    UPDATE_DEVICE,
    DELETE_DEVICE,

    IMAGE_LIST,
    LOG_LIST,
}