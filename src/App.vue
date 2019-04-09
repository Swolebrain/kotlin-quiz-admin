<template>
  <div>
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">Swolebrain - Kotlin</a>

          <router-link :to="'/'" class="btn btn-primary btn-margin">Home</router-link>

          <button class="btn btn-primary btn-margin" v-if="!authenticated" @click="login()">Log In</button>

          <button class="btn btn-primary btn-margin" v-else @click="logout()">Log Out</button>
        </div>
      </div>
    </nav>

    <div class="container-fluid">
      <router-view
        :authenticated="authenticated">
      </router-view>    
    </div>
    <div>
        <div id="firebaseui-auth-container"></div>
    </div> 
  </div>
</template>

<script>
import firebase from 'firebase';
import firebaseui from 'firebaseui';
import '../node_modules/firebaseui/dist/firebaseui.css';

export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {
    login: function () {
      let uiConfig = {
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
          signInSuccessWithAuthResult () {
            localStorage.setItem('authenticated', true);
            window.location.href = '/';
          }
        }
      };
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      ui.start('#firebaseui-auth-container', uiConfig);
    },
    logout: function () {
      firebase.auth().signOut().then(() => {
        console.log('called signOut');
        localStorage.setItem('authenticated', false)
        window.location.href = '/'
      })
    }
  },
  computed: {
    authenticated () {
      return JSON.parse(localStorage.getItem('authenticated'));
    }
  }
};
</script>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.css";

.btn-margin {
  margin-top: 7px;
}
* {
  box-sizing: border-box;
}
</style>
