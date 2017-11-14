<template>
    <div class="container">
        <Leaflet v-if="showMode === 'map'"></Leaflet>
    </div>
</template>

<script>
    import Leaflet from '../components/Leaflet'
    export default {
        components: { Leaflet },
        data() {
           return {
                showMode: 'map'
            }
        }
    }
</script>
<style>
.container{
    height: 100%;
}
</style>
