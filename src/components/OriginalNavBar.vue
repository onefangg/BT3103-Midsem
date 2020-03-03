<template>
    <div class ="header">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">loNUS by TBBT</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item variant = "light" href="#"><router-link to="/home-page">Home Page</router-link></b-nav-item>
            <b-nav-item href="#" ><router-link to="/SignUp">Sign In </router-link></b-nav-item>
            <b-nav-item href="#" ><router-link to="/About">About</router-link></b-nav-item>
          </b-navbar-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
</template>

<script>
  export default {

  }
</script>

<style>
  #box{
    background-color: rgba(0, 0, 0, 0.5
    );
    /* color:white; */
  }
  #welcome{
    /* color: white; */
    background-color:black;
  }

  
  .header {
    position:fixed; /* fixing the position takes it out of html flow - knows
                   nothing about where to locate itself except by browser
                   coordinates */
    left:0;           /* top left corner should start at leftmost spot */
    top:0;            /* top left corner should start at topmost spot */
    width:100vw;      /* take up the full browser width */
    z-index:200;  /* high z index so other content scrolls underneath */
    height:200px;     /*define height for content */
}
</style>