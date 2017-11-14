<template>
    <div>
        <div class="main-box">
            <LeftMenu class="left-menu" type="user"></LeftMenu>
            <div class="content">

                <TableBox :list="userList" @add="add" @edit="edit" @remove="remove" @enable="enable" @disable="disable" key="user0" v-if="!showGroup"></TableBox>
                <TableBox :list="userGroupList" @add="add" @edit="edit" @enable="enable" @disable="disable" :group="true" key="user1" v-else></TableBox>

                <Pagination :page="page" :currentPage="intpage"></Pagination>
            </div>
        </div>
        <div class="main-box center" v-if="showEditLayer || alertMsg">
            <EditLayer :currentItem="currentUser" @cancel="cancel" :group="showGroup" v-if="showEditLayer"></EditLayer>
            <Alert :msg="alertMsg" @cancel="cancelForAlert" @confirm="confirmForAlert" v-if="alertMsg"></Alert>
        </div>
    </div>
</template>

<script>
    import LeftMenu from '../components/LeftMenu'
    import Pagination from '../components/Pagination'
    import ControlBar from '../components/Table/ControlBar'
    import TableBox from '../components/Table/UserTable'
    import EditLayer from '../components/Table/UserEditLayer'
    import Alert from '../components/Table/AlertLayer'

    export default {
        components: { LeftMenu, ControlBar, EditLayer, TableBox, Pagination, Alert },

        data() {
            return {
                showGroup: false,
                showEditLayer: false,
                pagerow: 10,
                intpage: 1,

                currentUser: undefined,
                deleteUserArr: [],
                alertMsg: '',
            }
        },

        computed: {
            userList() {
                return this.$store.state.user.list
            },
            userGroupList() {
                return this.$store.state.user.groupList
            },
            page() {
                let count = this.$store.state.user.count
                return Math.ceil(count / this.pagerow)
            }
        },

        watch: {
            $route() {
                // watch group mod and page num
                this.load()
                this.showEditLayer = false
            }
        },

        methods: {
            load() {
                this.intpage = +this.$route.query.page || 1
                let query = {
                    pagerow: this.pagerow,
                    intpage: this.intpage
                }

                if (this.$route.path.match('group')) {
                    this.showGroup = true
                    this.$store.dispatch('getUserGroupList', query)
                } else {
                    this.showGroup = false
                    this.$store.dispatch('getUserList', query)
                }
            },
            add() {
                this.showEditLayer = true
            },
            edit(id) {
                if (this.showGroup) {
                    this.currentUser = this.userGroupList.find(item => item.ZID === id)
                } else {
                    this.currentUser = this.userList.find(item => item.UserID === id)
                }
                this.showEditLayer = true
            },
            disable(id) {
                this.$store.dispatch(this.showGroup ? 'disableLeader' : 'disableUser', id)
            },
            enable(id) {
                this.$store.dispatch(this.showGroup ? 'enableLeader' : 'enableUser', id)
            },
            remove(arr) {
                this.deleteUserArr = arr
                this.alertMsg = '确认删除用户？'
            },
            cancelForAlert() {
                this.deleteUserArr = []
                this.alertMsg = ''
            },
            confirmForAlert() {
                let len = this.deleteUserArr.length
                this.deleteUserArr.forEach(userId => {
                    this.$store.dispatch('deleteUserById', { userId })
                        .then(() => {
                            len--
                            if (len === 0) {
                                this.cancelForAlert()
                            }
                        })
                })
            },
            cancel() {
                this.showEditLayer = false
                this.currentUser = undefined
            },
            search() {

            }
        },

        created() {
            this.load()
        }
    }

</script>

<style scoped>
    .main-box {
        display: flex;
    }
    
    .left-menu {
        flex: none;
    }
    
    .content {
        flex: auto;
        padding: 12px 30px;
        overflow: auto;
    }
</style>