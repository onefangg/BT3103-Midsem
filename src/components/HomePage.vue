<template>
    <div class="home">
      <nb></nb>
      <b-container id="contain"> 
      <b-row>
          <b-col><b-img src='..\assets\team_meeting blue.svg' id="illustration"></b-img></b-col>
          <b-col><hr align="left" id="shortline"> 
          <div id = "text">Finding groupmates in NUS is easier than ever.</div>
          <div id ="subtext">Having difficulty finding project groupmates? Or just tired of studying alone? 
                              LoNUS does the heavy lifting for you to find new people to work with. </div>
          
          <div id = "joinbutton">
            <b-button variant="primary" class="btn btn-primary float-left" to="/SignIn">Join Now</b-button>
           </div>
          </b-col>
          
      </b-row>

      </b-container>


      <!-- <nb></nb> -->
      <!-- <div class="bg"> -->
        <!-- <nb></nb> -->
        <!--<div>
          <nb></nb>
        
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
      </div>-->
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