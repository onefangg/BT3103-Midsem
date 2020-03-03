<template>
    <div class="home">
      <!-- <nb></nb> -->
      <!-- <div class="bg"> -->
        <!-- <nb></nb> -->
        <div>
          <nb></nb>
          <!-- <h1 id='welcome' style = "padding:  0.5em 0.5em 0.5em 0em"> Welcome to loNUS! </h1> -->
          <b-jumbotron id = 'image' style="background-image: url(https://www.comp.nus.edu.sg/images/resources/content/01-ugbanner.jpg); background-size: 100%;"  class="mb-0">
           <div id = 'box' class="align-items-center">
            <div class="transbox">
           <h1 id='welcome' class="justify-content-center align-items-center"> Welcome to LoNUS! </h1>
            
            
                <h4 id='welcomemsg'>Looking for study buddies or project groups?</h4>
               
                <b-button variant="light" href="#"><router-link to="/SignIn">Sign In Now!</router-link></b-button>
                </div>
               
               <div style ="padding: 9em 2em 0em 0em"></div>
              
            </div>
          </b-jumbotron>
      </div>
    </div>
    <!-- </div> -->

</template> 
<script>
import NavBar from './NavBar.vue'
export default {
  components: {
    'nb':NavBar
  }
}
</script>

<style>
  .jumbotron {
      background-repeat: no-repeat;
      background-size: 100%;
      min-height: 70vh;
      margin-bottom: 0px;
      padding:  8em 2em 2em 2em;
      /*background-blend-mode: soft-light;*/
    
    
  }
  #image{
    opacity: 80%;
  }
  #welcome {
    margin-bottom:0px;
    margin-top: 50px;
    font: 3.5em sans-serif;
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
 
  .view {
      /* The image used */
      background-image: url("https://cdn.hipwallpaper.com/i/22/9/szOvfx.jpg");
  
      /* Full height */
      height: 100%;
  
      /* Center and scale the image nicely */
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      opacity:1;
    }
    div.transbox {
      margin-top: 30px;
      background-color: rgba(0, 0, 0, 0.5);
      padding-bottom:25px;
      margin-right: 400px;
      margin-left: 400px;
      border-radius: 25px;
    }
  
  
</style>