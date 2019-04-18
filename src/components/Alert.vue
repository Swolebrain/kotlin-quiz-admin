<template>
<div class="alert-container" v-bind:style="{ opacity: show? 1:0 }" @click="closeCallback()">
    <div id="div-alert" :class="['alert',type]" role="alert">
        <span>{{text}}</span>
        <button type="button" class="close"  aria-label="Close" @click="closeCallback()">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</div>
</template>
<script>
export default {
  name: 'Alert',
  props: {
    show: Boolean,
    type: String,
    closeCallback: Function,
    text: String
  }
}
</script>
<style scoped>
.alert-container{
    position: -webkit-sticky;
    position: sticky;
    width: 90%;
    bottom:0;
    transition: opacity 0.5s ease-in-out;
}
</style>
