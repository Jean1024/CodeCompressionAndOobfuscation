<template>
    <div class="main-box">
        <div v-if="conf"
             class="monitor space-between">
            <Player :rtmp="conf.FacilityUrl"
                    :rtmpWithin="conf.FacilityUrlWithin"
                    :hls="conf.FacilityUrlApp"
                    class="player"></Player>
    
            <Control :conf="conf"
                     class="ctrl"></Control>
    
            <Elements :facilityNumber="conf.FacilityNumber"
                      :key="conf.FacilityNumber"></Elements>
        </div>
    </div>
</template>

<script>
import Player from '../components/Player'
import Control from '../components/Control'
import Elements from '../components/Weather/Elements'

export default {
    components: { Player, Control, Elements },

    data() {
        return {
            fid: ''
        }
    },

    computed: {
        conf() {
            return [...this.$store.state.video.mapShowArr, ...this.$store.state.video.listShowArr].find(el => el.Fid === this.fid)
        }
    },

    created() {
        this.fid = this.$route.query.fid

        this.$store.dispatch('getVideoMapArr')
    }
}

</script>

<style scoped>
.main-box {
    overflow: auto;
}

.monitor {
    width: 1306px;
    margin: 16px auto;
}

.player,
.ctrl {
    border: 1px solid #dadada;
}

.player {
    width: 830px;
    height: 467px;
    background: #fff;
}

.ctrl {
    width: 464px;
    height: 468px;
}
</style>