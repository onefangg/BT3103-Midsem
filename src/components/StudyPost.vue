<template>
  <b-card id = 'post' style="max-width: 20rem;" >
      <template v-slot:header>
        <h6 class="mb-0"><b>{{groupName}}</b></h6>
      </template>
      
      
          <b-list-group flush>
          

            <b-row id = 'post_body'> 
            <b-list-group-item>
              {{mod_code}}:{{post_desc}}
            </b-list-group-item></b-row>
            
            
            
            <b-list-group-item>
              <b-row id ='post_body'>
                <b-col>
                  <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'users'}" class="faicon"/>
                  {{post_status}}
                </b-col>
                  <!-- delete post button and pop-up -->
                <b-col>
                  <b-button size = "sm"
                            variant = "danger"
                            @click ="showdelete = !showdelete"
                      >     Delete Group</b-button>
                  <b-modal v-model ="showdelete" @ok = "deletePost()">
                    Are you sure you want to delete this post?
                  </b-modal>
                </b-col>   
              </b-row> 

          <b-row>
            <b-button size="sm"
                        variant = "primary"
                        @click ="showMem = !showMem"
                        >View members ▼</b-button>
          </b-row>
              <b-row>
                <b-row v-show="showMem" class="mt-2">
                 <b-card id='members'>
                  <a href="#" v-for="item in members" :key="item" @click="redirect">
                  @{{item}}</a>
                 
                 </b-card>
                </b-row>
              </b-row>
            </b-list-group-item>


          </b-list-group>
     
      <template v-slot:footer>
       
        
        <b-modal v-model="modalShow">Success!</b-modal>
        <b-row>
          
          <b-col cols = "8"  id = 'post_author'>
            <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'user-circle'}" class="faicon"/>Created by: <br><a href="#" @click="redirect">@{{members[0]}}</a>
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
import database from '../firebase.js'


export default {
  data() {
    return {
      modalShow: false,
      showdelete :false,
      showMem: false
    }
  },
  props: ['groupName', 'userId', 'post_desc', 'post_status', 'post_date', 'location', 'faculty', 'members', 'hide_post', 'mod_code'],
  methods: {
    redirect: function(){
      this.$router.push({
        path: '/users' +'/' + this.userId, 
        params: {
          userId: this.userId
      }})
    }, 
    deletePost: function() {
      this.hide_post = !this.hide_post
      database.collection("Project Group").doc(this.doc_id).update({
        hidden: true
      })
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
  margin: 5px;
  width: 20rem;
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