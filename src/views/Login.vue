<template>
    <div class="main-box center">
        <img src="../assets/login-logo.png" alt="天气网眼后台登录">

        <div class="content">
            <form @submit.prevent="signin">
                <div v-if="err" class="alert">{{err}}</div>
                <input type="text" placeholder="用户名" autofocus v-model.trim="user.name">
                <input type="password" placeholder="密码" v-model.trim="user.password">
                <button class="button" type="submit">登录</button>
                <button class="button float-right" type="button" @click="cancel">取消</button>
            </form>
            <span class="help">忘记密码？</span>
        </div>

        <footer>
            <img src="../assets/huafeng.png">
            <div class="statement">
                <p>版权所有 2013-2017 中国气象局公共气象服务中心和北京华风创新网络技术有限公司</p>
                <p>制作维护：北京华风创新网络技术有限公司</p>
                <p>地址：北京市海淀区中关村南大街46号中国气象局华风楼5G</p>
            </div>
        </footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    name: '',
                    password: ''
                }
            }
        },

        computed: {
            err() {
                return this.$route.query.err
            }
        },

        methods: {
            signin() {
                if (this.user.name === '' || this.user.password === '') {
                    location.replace('#/login?err=请输入用户名和密码')
                    return
                }

                let user = Object.assign({}, this.user)
                this.$store.dispatch('signin', user)
            },

            cancel() {
                this.user.name = ''
                this.user.password = ''
            }
        }
    }

</script>

<style scoped>
    .main-box {
        top: 0;
        background: #22282e;
    }
    
    .center {
        flex-direction: column;
    }
    
    .content {
        width: 835px;
        height: 296px;
        background-image: url(../assets/bro.png);
        margin: 60px 0 80px;
        flex: none;
        display: flex;
        flex-flow: column nowrap;
        align-items: flex-end;
        padding: 68px 130px 0 0;
    }
    
    .content .alert {
        width: 212px;
        background: #eee;
        margin-bottom: 4px;
        padding: 1px 5px;
        line-height: 18px;
        font-size: 12px;
        color: #ff5656;
    }
    
    .content input {
        width: 212px;
        height: 36px;
        border: 1px solid #282e34;
        color: #818b94;
        font-size: 14px;
        background: #39424a;
        margin-bottom: 10px;
    }
    
    .content input:focus {
        box-shadow: none;
    }
    
    .content .button {
        padding: 0;
        width: 100px;
        height: 30px;
        line-height: 28px;
        border: 1px solid #184a6c;
        margin-top: 4px;
        background: linear-gradient(to top, #0353bd, #0383d5);
        color: #d5dde9;
        font-size: 12px;
    }
    
    .content .button:hover {
        opacity: 0.9;
    }
    
    .content .help {
        color: #777;
        font-size: 12px;
    }
    
    footer {
        color: #575a5f;
        font-size: 12px;
        display: flex;
        align-items: center;
    }
    
    footer .statement {
        border-left: 1px solid #2d3238;
        padding-left: 8px;
        margin-left: 12px;
    }
    
    footer p {
        margin: 0;
    }
</style>