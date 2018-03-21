<template>
    <div class="wrapper">
        <y-head></y-head>
        <y-slider></y-slider>
        <div class="content">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    import yHead from "./header.vue";
    import ySlider from "./sliderbar.vue";
    export default{
        components:{
            yHead,ySlider
        }
    }
</script>