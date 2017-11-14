<template>
    <div class="main-box">
        <VideoList class="video-list"
                   groupLink="/image/list"
                   itemLink="/image/thumbnail">
        </VideoList>
    </div>
</template>

<script>
import VideoList from '../components/VideoList'

export default {
    components: { VideoList }
}

</script>

<style scoped>
.main-box {
    overflow: auto;
}

.video-list {
    margin: 24px auto;
}
</style>