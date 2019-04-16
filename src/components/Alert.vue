<template>
<div class="alert-container" v-bind:style="{ opacity: show? 1:0 }" @click="closeCallback()">
    <div id="div-alert" :class="['alert',type]" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below
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
    closeCallback: Function
  }
}
</script>
<style scoped>
.alert-container{
    position: -webkit-sticky;
    position: sticky;
    width: 90%;
    bottom:0;
}
</style>
