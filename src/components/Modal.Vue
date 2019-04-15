<template>
    <div class="modal" v-bind:class="customClass" v-bind:style="{ display: show ? 'flex': 'none'}">
        <div class="overlay" @click="closeCallback()" />
        <div class="modal_content_container">
            <button title="Close" class="close_modal" @click="closeCallback()">
              <i class="fas fa-times"></i>
            </button>
            <slot class="modal_content"></slot>
        </div>   
    </div>    
</template>
<script>
export default {
  name: 'Modal',
  props: {
    show: Boolean,
    customClass: String,
    closeCallback: Function
  }
}
</script>
<style scoped>
.overlay {
    width: 100%;
    z-index: 1;
    opacity: 0.7;
    background-color: #000000;
}

.modal_content_container{
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: -75%;
    margin-top: 25vh;
    height: 50vh;
    z-index: 2;
    background-color: #ffffff;
    padding: 2vh;
}

.modal_content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.close_modal{
  align-self: flex-end;
  font-size: 18px;
  opacity: 0.5;
  background: none;
  border: none;
}

</style>
