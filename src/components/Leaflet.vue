<template>
    <div id="map-container">
    </div>
</template>

<script>
export default {
    data() {
        return {
            map: null,
            leafletMap: null
        }
    },

    methods: {
        initBMap() {
            this.leafletMap = L.map('map-container', {
                worldCopyJump: true,
                renderer: L.canvas(),
                center: [36, 114],
                zoom: 2,
                maxZoom: 17,
                minZoom: 3,
                layers:[
                    L.tileLayer('https://api.mapbox.com/styles/v1/qiuzhilin/cj9p8f06w1axu2ss8ogmcgi5r/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicWl1emhpbGluIiwiYSI6ImNqNHoyNDN4dTF6c3gyd3BoNGR2bmM0N2YifQ.jfV42bsQ5XKYP3OF1MvGqw'),
                    L.tileLayer('http://61.4.184.185:5000/pyapi/gettileimage/{z}/{x}/{y}')
                ]
          })
        }
    },

    mounted() {
        this.initBMap()
    }
}
</script>

<style scoped>
#map-container {
    height: 100%;
}
</style>