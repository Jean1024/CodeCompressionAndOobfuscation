<template>
    <div class="main-box">
        <!-- v-if 记录地图缩放和位置信息 -->
        <Leaflet v-if="showMode === 'map'" :marks="mapShowArr"></Leaflet>

        <template v-if="showMode === 'list'">
            <VideoList class="video-list" groupLink="/video/list" itemLink="/video/play"></VideoList>
        </template>

        <div class="switch-view">
            <span class="btn-background"><router-link to="/video/list" class="button">列表</router-link></span>
            <span class="btn-background"><router-link to="/video/map" class="button">地图</router-link></span>
        </div>
    </div>
</template>

<script>
    // import BMap from '../components/BMap'
    import Leaflet from '../components/Leaflet'
    import VideoList from '../components/VideoList'

    export default {
        components: { Leaflet, VideoList },

        data() {
            return {
                showMode: 'map'
            }
        },

        computed: {
            mapShowArr() {
                return this.$store.state.video.mapShowArr
            }
        },

        watch: {
            $route() {
                this.showMode = this.$route.path.split('/')[2]
            }
        },

        created() {
            this.$store.dispatch('getVideoMapArr')
        }
    }

</script>

<style scoped>
    .main-box {
        overflow: auto;
    }
    
    .switch-view {
        position: absolute;
        top: 10px;
        right: 42px;
        z-index: 998;
    }
    
    .switch-view .btn-background {
        display: inline-block;
        border: 4px solid #e0e0e0;
        border-radius: 1px;
    }
    
    .switch-view .button {
        margin: 0;
        padding: 0;
        width: 94px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        color: #1c5d89;
        background: linear-gradient(to top, #e6e6e6, #f5f5f5);
        border: 1px solid #f9f9f9;
        box-shadow: 0 0 1px #c1c1c1;
        border-radius: 1px;
    }
    
    .switch-view .router-link-active {
        color: #d6e0eb;
        background: linear-gradient(to top, #1363cc, #1392e4);
        border-color: #34a3ec;
        box-shadow: 0 0 1px #26628a;
    }
    
    .video-list {
        margin: 66px auto;
    }
</style>