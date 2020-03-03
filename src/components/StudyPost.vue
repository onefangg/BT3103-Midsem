<template>
  <b-card id = 'post' style="max-width: 20rem;" header-tag="modheader" footer-tag="modfooter">
      <template v-slot:header>
        <h6 class="mb-0"><b>{{groupName}}</b></h6>
      </template>
      
      
          <b-list-group flush>
          

            <b-row id = 'post_body'> 
            <b-list-group-item>
              {{post_desc}}
              
            </b-list-group-item></b-row>

            <b-list-group-item>
              <b-row id ='post_body'>
                
                <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'users'}" class="faicon"/>
                
                {{post_status}}</b-row> 
                 <b-row><b-button v-b-toggle.collapse-1 size="sm" variant="outline-primary" id="collapse-button-1">see members ▼</b-button></b-row>
               <b-row> <b-collapse id="collapse-1" class="mt-2">
                 <b-card id='members'>
                  <a href="#" v-for="item in members" :key="item" @click="redirect">
                  @{{item}}</a>
                 
                 </b-card>
                </b-collapse></b-row>
            </b-list-group-item>


          </b-list-group>
     
      <template v-slot:footer>
       
        
        <b-modal v-model="modalShow">Success!</b-modal>
        <b-row>
          <b-col cols = "8"  id = 'post_author'>
            <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'user-circle'}" class="faicon"/>Created by: <br><a href="#" @click="redirect">@{{userId}}</a>
          <br> <div id="date">{{disp_date}}</div>
          </b-col>
          <b-col cols = "2">
            <b-button variant = 'primary' @click="modalShow = !modalShow">Join group!</b-button>
          </b-col>
        </b-row>
      </template>
  </b-card>
</template>

<script>
var moment = require('moment')
export default {
  data() {
    return {
      modalShow: false
    }
  },
  props: ['groupName', 'userId', 'post_desc', 'post_status', 'post_date', 'location', 'faculty', 'members'],
  methods: {
    redirect: function(){
      this.$router.push({
        path: '/users' +'/' + this.userId, 
        params: {
          userId: this.userId
      }})
    }
  },
  computed: {
    disp_date() {
      return moment(this.post_date).fromNow();
    }
    
  }
}
</script>

<style>
#post_  title {
  font-weight: bold
}
#post {
  margin: 5px
}
#members {
  text-align: left;
  font-size:12px;
}
#post_body {
  text-align: left
}
#date {
  color: grey;
}
</style>