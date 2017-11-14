<template>
    <div class="main-box">
        <div class="log wrapper">
            <div class="select-box">
                <label>日志类型：
                    <select v-model="type"
                            @change="changeType">
                        <option value="0">用户日志</option>
                        <option value="1"
                                v-if="isAdmin">管理员日志</option>
                    </select>
                </label>
    
                <label>信息筛选：
                    <select v-model="logType"
                            @change="getLog">
                        <option value="all">无</option>
                        <option value="0">登录记录</option>
                        <option value="1">修改记录</option>
                        <option value="2">添加记录</option>
                    </select>
                </label>
            </div>
    
            <table>
                <thead>
                    <tr>
                        <th>内容</th>
                        <th>时间</th>
                        <th>操作用户</th>
                        <th>用户手机号</th>
                        <th v-if="type==='0'">用户所在组</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="el in list">
                        <td>{{el.LogTypeVlue}}</td>
                        <td>{{el.LogTime}}</td>
                        <td>{{el.UserName}}</td>
                        <td>{{el.UserPhone}}</td>
                        <td v-if="type==='0'">{{el.Zname}}</td>
                    </tr>
                </tbody>
            </table>
    
            <Pagination :page="page"
                        :currentPage="intpage"></Pagination>
        </div>
    </div>
</template>

<script>
import Pagination from '../components/Pagination'

export default {
    components: { Pagination },

    data() {
        return {
            type: '0',
            logType: 'all',
            pagerow: 10,
        }
    },

    computed: {
        isAdmin() {
            return this.$store.state.session.isAdmin
        },
        list() {
            return this.$store.state.log.list
        },
        intpage() {
            return +this.$route.query.page || 1
        },
        page() {
            var count = this.$store.state.log.count
            return Math.ceil(count / this.pagerow)
        }
    },

    watch: {
        intpage() {
            this.getLog()
        }
    },

    methods: {
        changeType() {
            if (this.$route.path !== this.$route.fullPath) {
                this.$router.replace(this.$route.path)
            } else {
                this.getLog()
            }
        },
        getLog() {
            var logType = this.logType === 'all' ? undefined : this.logType
            this.$store.dispatch('getLogList', {
                type: +this.type,
                logType: logType,
                pagerow: this.pagerow,
                intpage: this.intpage
            })
        }
    },

    created() {
        this.getLog()
    }
}

</script>

<style scoped>
.main-box {
    overflow: auto;
}

.log {
    margin: 20px auto;
    font-size: 14px;
}

.select-box {
    display: flex;
}

select {
    width: 200px;
    margin-right: 32px;
    font-size: 14px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #cacaca;
    text-align: center;
}
tbody tr{
    box-sizing: border-box;
}
tbody tr:nth-child(odd){
    background: #fff;
}
tbody tr:nth-child(even){
    background: #f6f6f6;
}
tbody tr:hover{
    border: 3px solid #98b6d0;
    background-color: #e8f1f9;
    box-sizing: border-box;
}
</style>