<template>
    <div class="home">
      <nb></nb>
      <b-container id="contain"> 
      <b-row>
          <b-col><b-img src='..\assets\team_meeting blue.svg' id="illustration"></b-img></b-col>
          <b-col><hr align="left" id="shortline"> 
          <div id = "text">Finding groupmates in NUS is easier than ever.</div>
          <div id ="subtext">Having difficulty finding project groupmates? Or just tired of studying alone? LoNUS does the heavy lifting for you to find new people to work with. 
          </div>
          <div id = "joinbutton">
            <b-button variant="primary" v-if="!user" class="btn btn-primary float-left" to="/Sign-In">Join Now</b-button>
            <b-button variant="primary" v-if="user" class="btn btn-primary float-left mr-2" to="/Group-Page">Join a group</b-button>
            <b-button variant="primary" v-if="user" class="btn btn-primary float-left" to="/Create-Group">Create a group</b-button>
           </div>
          </b-col>
      </b-row>
      </b-container>
    </div>

</template> 
<script>
import NavBar from './NavBar.vue'
import firebase from 'firebase'

export default {
  components: {
    'nb':NavBar
  }, 
  data () {
      return {
      user: null
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
  #contain {
    padding-top: 40px;
  }
  #illustration{
    max-width: 500px;
  }
  #text{
    text-align: left;
    font-weight:800;
    font-size:30px;
    color: black;
    line-height: 135%;
    letter-spacing: 0.7px;
  }
  #subtext {
    font-weight:500;
    padding-top:14px;
    text-align:left;
    letter-spacing: 0.7px;
  }
  #shortline{
   background-color: #558FE5; 
   height: 2px; 
   border: 0;
   width:20%;
  }
  #joinbutton{
    padding-top:18px;
  }
  #image{
    opacity: 80%;
  }
  #welcome {
    margin-bottom:0px;
    margin-top: 50px;
    font: 3.5em;
    text-shadow: 3px 4px 4px #000000;
    font-weight: 800;
  }
  #welcomemsg {
    text-shadow: 3px 2px 6px #000000;
    font-weight: 500;
  }
  #box{ /* this box holds the image padding*/
    background-color: rgba(0, 0, 0, 0);
    color:white;
    position:static;
    padding-bottom: 200px;
    align-content: center;
    align-self: center;
    align-items: center;
    border-width: 1.5px; 
    border-color: grey; 
    border-style:transparent;
  }
</style>