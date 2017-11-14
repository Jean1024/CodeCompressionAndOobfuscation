<template>
    <div class="main-box">
        <div class="wrapper">
            <div class="item"
                 v-for="(src, index) of small"
                 :key="src"
                 @click="show(index)">
                <img class="thumbnail"
                     :src="src">
            </div>
        </div>
    
        <div class="main-box layer"
             v-if="src">
            <div class="item-show zoom-in">
                <img class="thumbnail"
                     :src="src">
                <span class="close-icon"
                      @click="hide()">×</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            src: ''
        }
    },

    computed: {
        small() {
            return this.$store.state.image.small
        },
        list() {
            return this.$store.state.image.list
        }
    },

    methods: {
        show(index) {
            this.src = this.list[index]
        },
        hide() {
            this.src = ''
        }
    },

    beforeCreate() {
        var fid = this.$route.query.fid
        this.$store.dispatch('getImageList', { fid })
    }
}

</script>

<style scoped>
.main-box {
    overflow: auto;
}

.wrapper {
    display: flex;
    flex-wrap: wrap;
    margin: 16px auto;
}

.item {
    flex: 0 0 25%;
    padding: 0 5px;
}

.item .thumbnail {
    width: 100%;
    cursor: pointer;
}

.layer {
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 0;
}

.item-show {
    width: 1288px;
    margin: 0 auto;
    position: relative;
}

@media(max-width: 1300px) {
    .item-show {
        width: 1080px;
    }
}

.close-icon {
    position: absolute;
    top: 4px;
    right: 4px;
    display: inline-block;
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    font-size: 42px;
    text-align: center;
    line-height: 54px;
    color: rgba(255, 255, 255, 0.5);
}

.close-icon:hover {
    color: rgba(255, 255, 255, 0.7);
}
</style>