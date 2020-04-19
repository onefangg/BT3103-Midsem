<template>
    <div>
      <nb></nb>
      <b-container><div id="pleaseSignIn">
      <b-row>
      <b-col cols="4"><b-img src='..\assets\sad_face.svg' id="illustration"></b-img></b-col>
      <b-col>
        <div id = "text"><h3>You must be signed in to access all LoNUS features.</h3></div>
      <b-button variant="primary" class="btn btn-primary mr-3 float-left" to="/Sign-In">Sign In</b-button>
      <b-button variant="primary" class="btn btn-primary float-left" to="/Register">Register</b-button>
      </b-col></b-row>
      </div>
      </b-container>      
    </div>
</template>
<script>
import NavBar from './NavBar.vue'

export default {
  name: 'Not-Signed-In',
  components: {
      'nb':NavBar
    }
}
</script>

<style scoped>
  #pleaseSignIn {
    margin-top: 30px;
    padding-bottom: 15px;
  }

  #illustration{
    max-width: 400px;
    max-height: 400px;
  }

  #text{
    text-align: left;
    font-weight:800;
    font-size:30px;
    color: black;
    line-height: 135%;
    letter-spacing: 0.7px;
    margin-bottom:20px;
  }
</style>