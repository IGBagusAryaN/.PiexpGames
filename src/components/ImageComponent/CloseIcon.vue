<template>
    <img src="../../assets/Close.svg" alt="Log" v-bind:style="{width:imageWidth, height:imageHeight}">
</template>

<script>
export default{
props: {
imageWidth:{
    type: String,
    default: null
},
imageHeight:{
    type: String,
    default: null
},
},
}
</script>

<style>

</style>