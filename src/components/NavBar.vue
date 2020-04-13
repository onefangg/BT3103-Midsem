<template>
  <nav class="site-header sticky-top py-2 navbar navbar-light" id="head">
    <div class="container d-flex flex-column flex-md-row justify-content-between">
      <a class="py-1 d-md-inline-bloc" href="#"><router-link to="/">LoNUS by TBBT
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mx-auto" role="img" viewBox="0 0 24 24" focusable="false"><title>Product</title><circle cx="12" cy="12" r="10"/><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"/></svg>
    </router-link></a>
      <a class="py-3 d-none d-md-inline-block" href="#"><router-link to="/">Home</router-link></a>
      <a class="py-3 d-none d-md-inline-block" href="#"><router-link to="/About">About</router-link></a>
      <a class="py-3 d-none d-md-inline-block" href="#"><router-link to="/Contact">Contact Us</router-link></a>
      <a class="py-3 d-none d-md-inline-block" href="#"><router-link to="/Create-Group">Create Group</router-link></a>
      <a class="py-3 d-none d-md-inline-block" href="#"><router-link to="/Group-Page">Join Group</router-link></a>
      <div class="dropdown-1" v-if="user">
      <b-dropdown id="dropdown-1" right text="User" variant="primary" class="m-3" size="15px">
        <b-dropdown-item href="#" to="/Edit-Details">Edit Details</b-dropdown-item>
        <b-dropdown-item href="#" to="/Group-Page">Find friends</b-dropdown-item> 
        <b-dropdown-item v-on:click="signOut">Sign Out</b-dropdown-item>
      </b-dropdown>
      </div> 
    </div>
</nav>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
      return {
      user: null
    }
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/Sign-In');
      });
    }
  },
  created: function () {
    var vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.user = user;
      } else {
        vm.user = null;
      }
    });
  }
}
</script>

<style>
.container {
  max-width: 960px;
}

/*
 * Custom translucent site header
 */
.site-header {
  background-color: #FAFAFA;/*rgba(255, 118, 6, 0.85);*/
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  backdrop-filter: saturate(180%) blur(20px);
  vertical-align: middle;
} 
.site-header a {
  color: rgb(255, 187, 0);
  vertical-align: middle;
  font-size: 20px;
} 
.site-header a:hover {
  color: rgb(255, 166, 0);
  text-decoration: none;
  vertical-align: middle;
}
#head a {
  color: rgb(12, 0, 121);
  font-weight: 700;
  transition: ease-in-out color .15s;
  vertical-align: middle;
  font-size: 20px;
} 
#head a:hover {
  color: black;
  text-decoration: underline;
  vertical-align: middle;
}
/*
 * Dummy devices (replace them with your own or something else entirely!)
 */

.product-device {
  position: absolute;
  right: 10%;
  bottom: -30%;
  width: 300px;
  height: 540px;
  background-color: #333;
  border-radius: 21px;
  -webkit-transform: rotate(30deg);
  transform: rotate(30deg);
}

.product-device::before {
  position: absolute;
  top: 0%;
  right: 10px;
  bottom: 10%;
  left: 10px;
  content: "";
  background-color: rgba(255, 255, 255, .1);
  border-radius: 5px;
}

.product-device-2 {
  top: -25%;
  right: auto;
  bottom: 0;
  left: 5%;
  background-color: #e5e5e5;
}

/*
 * Extra utilities
 */

.flex-equal > * {
  -ms-flex: 1;
  flex: 1;
}
@media (min-width: 768px) {
  .flex-md-equal > * {
    -ms-flex: 1;
    flex: 1;
  }
}

.overflow-hidden { overflow: hidden; }

.header {
    position:absolute; /* fixing the position takes it out of html flow - knows
                   nothing about where to locate itself except by browser
                   coordinates */
    left:0;           /* top left corner should start at leftmost spot */
    top:0;            /* top left corner should start at topmost spot */
    width:100vw;      /* take up the full browser width */
    z-index:200;  /* high z index so other content scrolls underneath */
    height:100px;     /* define height for content */
    vertical-align: middle;
}
</style>