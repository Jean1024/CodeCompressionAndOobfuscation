<template>
    <div class="edit-layer">

        <form @submit.prevent="handleSubmit">
            <mark v-if="err">{{err}}</mark>

            <label v-if="group">
                <mark>*</mark>组名称：
                <input type="text" v-model.trim="zName">
            </label>
            <label v-if="!groupEditMode">
                <mark>*</mark>{{group?'组长':''}}用户名：
                <input type="text" v-model.trim="userInfo.UserNo">
            </label>
            <label>
                <mark>*</mark>{{group?'组长':''}}姓名：
                <input type="text" v-model.trim="userInfo.UserName" :disabled="groupEditMode">
            </label>
            <label>
                邮箱：
                <input type="email" v-model.trim="userInfo.UserMail" :disabled="groupEditMode">
            </label>
            <label>
                手机号码：
                <input type="number" v-model.trim="userInfo.UserPhone" :disabled="groupEditMode">
            </label>

            <template v-if="!group">
                <label>
                    <mark>*</mark>禁止操作设备：
                    <input disabled type="checkbox" v-model.trim="user.agent">
                </label>

                <label>
                    <mark>*</mark>选择组：
                    <input disabled type="text" v-model.trim="zName" disabled="true" v-if="currentItem">
                    <select disabled v-model.trim="zID" v-else>
                        <option :value="item.ZID" v-for="item of leaderList">{{item.Zname}}</option>
                    </select>
                </label>
            </template>

            <template v-if="!groupEditMode">
                <label>
                    <mark>*</mark>密码：{{currentItem?'（如果密码为空，则默认不修改）':''}}
                    <input disabled type="password" v-model.trim="user.passwd">
                </label>
                <label>
                    <mark>*</mark>重新输入密码：
                    <input disabled type="password" v-model.trim="rePasswd">
                </label>
            </template>

            <button type="button" class="secondary button" @click="cancel">取消</button>
            <button type="submit" class="button">确定</button>
        </form>
    </div>
</template>

<script>
    export default {
        props: ['currentItem', 'group'],

        data() {
            return {
                err: '',
                user: {
                    no: '',
                    name: '',
                    email: '',
                    phone: '',
                    type: false,
                    agent: false, // 用户操作设备权限0允许操作摄像头1不允许操作摄像头（不传默认为0）
                    passwd: '',
                },
                rePasswd: '',
                zName: '',
                zType: false, // 组状态0为可用1为不可用 组状态为1组内所有成员不允许登录
                zID: '',
                userId: '',
            }
        },

        computed: {
            leaderList() {
                return this.$store.state.user.leaderList
            },
            groupEditMode() {
                return this.group && this.currentItem
            },
            userInfo() {
                return this.$store.state.session.detail
            }
        },
        methods: {
            handleSubmit() {
                this.err = ''
                if (this.userInfo.UserNo === '') {
                    this.err = '请输入账号'
                    return
                }
                if (this.userInfo.UserName === '') {
                    this.err = '请输入姓名'
                    return
                }
                // if (!this.currentItem) {
                //     if (this.user.passwd === '' || this.rePasswd === '') {
                //         this.err = '请输入密码'
                //         return
                //     }
                // }
                // if (this.user.passwd !== this.rePasswd) {
                //     this.err = '密码两次输入不一致'
                //     return
                // }

                let handleErr = err => err ? this.err = err : this.cancel()

                if (this.group) {
                    if (this.currentItem) {
                        let query = {
                            zID: this.zID,
                            zName: this.zName
                        }
                        this.$store.dispatch('updateLeader', query).then(handleErr)
                    } else {
                        if (this.zName === '') {
                            this.err = '请输入组名称'
                            return
                        }
                        let query = Object.assign({ zName: this.zName, zType: this.zType }, this.user)
                        this.$store.dispatch('createLeader', query).then(handleErr)
                    }
                } else {
                    if (this.currentItem) {
                        // 编辑用户不能修改所在组
                        let query = Object.assign({ userId: this.userId }, this.user)
                        this.$store.dispatch('updateUserInfo', query).then(handleErr)
                    } else {
                        // if (this.zID === '') {
                        //     this.err = '请选择组'
                        //     return
                        // }
                        // let query = Object.assign({ zID: this.zID }, this.user)
                        // this.$store.dispatch('createUser', query).then(handleErr)
                    }
                }
                
                history.back(-1)
                // location.replace('#/video/map')
            },
            cancel() {
                this.$emit('cancel')
                history.back(-1)
                // location.replace('#/video/map')
            }
        },

        created() {
            if (this.group === false) {
                this.$store.dispatch('getLeaderList')
            }
            if (this.currentItem) {
                let el = this.currentItem
                if (this.group) {
                    this.zName = el.zname
                    this.zID = el.ZID
                    this.user = {
                        name: el.userName,
                        email: el.userMail,
                        phone: el.userPhone,
                        passwd: '',
                    }
                } else {
                    this.userId = el.UserID
                    this.user = {
                        no: el.UserNo,
                        name: el.UserName,
                        email: el.UserMail,
                        phone: el.UserPhone,
                        type: Boolean(+el.UserType),
                        agent: Boolean(+el.UserAgent), // 用户操作设备权限0允许操作摄像头1不允许操作摄像头（不传默认为0）
                        passwd: '',
                    }
                    this.zID = el.ZID
                    this.zName = el.Zname
                }
            }
        }
    }

</script>

<style scoped>
    .edit-layer {
        width: 100%;
        height: 100%;
        background-color: #eaeaea;
        color: #0a0a0a;
        border: 1px solid rgba(10, 10, 10, 0.25);
        overflow: scroll;
        position: fixed;
        top: 68px;
        left: 0;
        right: 0;
        bottom: 0;
    }
    
    form {
        width: 400px;
        padding: 20px 30px 0;
        margin: 0 auto;
    }
    
    label > mark {
        background: none;
        color: red;
    }
    button{
        width: 10.45rem;
    }
</style>