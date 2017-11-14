<template>
    <div>
        <div class="main-box">
            <LeftMenu class="left-menu" type="device"></LeftMenu>
            <div class="content">

                <TableBox :list="deviceList" @add="add" @edit="edit" @enable="enable" @disable="disable" @remove="remove" key="device0" v-if="!showGroup"></TableBox>
                <TableBox :list="deviceGroupList" :group="true" key="device1" v-else></TableBox>

                <Pagination :page="page" :currentPage="intpage"></Pagination>
            </div>
        </div>
        <div class="main-box center" v-if="showEditLayer || alertMsg">
            <EditLayer :group="showGroup" :currentItem="currentDevice" @cancel="cancel" v-if="showEditLayer"></EditLayer>
            <Alert :msg="alertMsg" @cancel="cancelForAlert" @confirm="confirmForAlert" v-if="alertMsg"></Alert>
        </div>
    </div>
</template>

<script>
    import LeftMenu from '../components/LeftMenu'
    import Pagination from '../components/Pagination'
    import TableBox from '../components/Table/DeviceTable'
    import EditLayer from '../components/Table/DeviceEditLayer'
    import Alert from '../components/Table/AlertLayer'

    export default {
        components: { LeftMenu, EditLayer, TableBox, Pagination, Alert },

        data() {
            return {
                showGroup: false,
                showEditLayer: false,
                pagerow: 10,
                intpage: 1,

                currentDevice: null,
                deleteFidArr: '',
                alertMsg: '',
            }
        },

        computed: {
            deviceList() {
                return this.$store.state.device.list
            },
            deviceGroupList() {
                return this.$store.state.device.groupList
            },
            page() {
                let count = this.$store.state.device.count
                return Math.ceil(count / this.pagerow)
            }
        },

        watch: {
            $route() {
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
                    this.$store.dispatch('getDeviceGroupList', query)
                } else {
                    this.showGroup = false
                    this.$store.dispatch('getDeviceList', query)
                }
            },
            add() {
                this.showEditLayer = true
            },
            cancel() {
                this.showEditLayer = false
                this.currentDevice = null
            },
            edit(fid) {
                this.currentDevice = this.deviceList.find(item => item.Fid === fid)
                this.showEditLayer = true
            },
            enable(fid) {
                this.$store.dispatch('enableDevice', fid)
            },
            disable(fid) {
                this.$store.dispatch('disableDevice', fid)
            },
            remove(arr) {
                this.deleteFidArr = arr
                this.alertMsg = '确认删除设备？'
            },
            cancelForAlert() {
                this.deleteFidArr = []
                this.alertMsg = ''
            },
            confirmForAlert() {
                let len = this.deleteFidArr.length
                this.deleteFidArr.forEach(fid => {
                    this.$store.dispatch('deleteDeviceByFid', { fid })
                        .then(() => {
                            len--
                            if (len === 0) {
                                this.cancelForAlert()
                            }
                        })
                })
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