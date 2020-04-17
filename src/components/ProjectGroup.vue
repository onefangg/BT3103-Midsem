<template>
  <b-card id = 'post' v-show = "!hide_post" style="max-width: 20rem;" >       
        <!-- header (module code etc.) -->
        <template v-slot:header>
          <h6 class="mb-0">
            <b>Module code: {{module}}</b>  
          </h6>   
        </template>

      <!-- card body -->
      <b-list-group flush>
        <b-row id = 'post_body'> 
          <b-list-group-item>
            {{post_desc}}    
          </b-list-group-item>
        </b-row>
      
        <b-list-group-item>
          <!-- is there enough members/full capacity -->
          <b-row id ='post_body'>     
            <b-col>
              <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'users'}" class="faicon"/>
              {{post_status}}
            </b-col>

          </b-row> 
         
          <!-- showing all members button -->
          <b-row class="mt-2">
            <b-button size="sm"
              variant = "primary"
              @click ="showMem = !showMem"
              >View members ▼</b-button>
          </b-row>
              <!-- generating all members in the group -->
              <b-row>
                <b-row v-show="showMem" class="mt-2">
                  <b-card id='members'>
                    <a v-for="item in members" :key="item" >
                      <router-link :to= "{name: 'profile', params: {userId: item}}">@{{item}}</router-link>
                    </a>
                  </b-card>
                </b-row>
              </b-row>
        </b-list-group-item>
      </b-list-group>
     
      <template v-slot:footer>
        <b-modal v-model="modalShow" @ok = "joinGroup()">Are you sure you want to join this group?</b-modal>
        <b-modal v-model="teleShow">Successfully joined group! Please contact the creator of the group on telegram @{{creatorTele}}</b-modal>
        <b-modal v-model="alreadyin">You are already in this group!</b-modal>
        <b-row>
          <b-col cols = "8"  id = 'post_author'>
            <font-awesome-icon :icon="{ prefix: 'fas', iconName: 'user-circle'}" class="faicon"/>Created by: <br> 
            <router-link :to= "{name: 'profile', params: {userId: userId}}">@{{userId}}</router-link>
            <br> <div id="date">{{disp_date}}</div>
          </b-col>
          <b-col cols = "2">
            <b-button v-if="showjoin()" variant = 'primary' @click="modalShow = !modalShow">Join group!</b-button>
              <!-- delete post button and pop-up -->
              <b-button
                v-if="byUser(userId)" 
                variant = "danger"
                @click ="showdelete = !showdelete"
                >Delete Group</b-button>
              <b-modal v-model ="showdelete" @ok = "deletePost()">
                Are you sure you want to delete this post?
              </b-modal>
          </b-col>
        </b-row>
      </template>
  </b-card>
</template>

<script>
var moment = require('moment')
import database from '../firebase.js'
import firebase from 'firebase'

export default {
  data() {
    return {
      modalShow: false,
      teleShow: false,
      alreadyin: false,
      showdelete :false,
      showMem: false,
      user: null,
      email: '',
      UserName: '',
      creatorTele: '',
      userdoc_id: ''
    }
  },
  props: ['module', 'userId', 'post_desc', 'post_status', 'post_date', 'members', 'doc_id', 'hide_post','poster'],
  methods: {
    redirect: function(){
      this.$router.push({
        path: '/users' +'/' + this.userId, 
        })
    },
    joinGroup: function() {
      if (this.members.includes(this.UserName)) {
        this.alreadyin = !this.alreadyin
      } else {
        database.collection("Project Group").doc(this.doc_id).update({
          UserNames: firebase.firestore.FieldValue.arrayUnion(this.UserName)
        })
        database.collection("Users").doc(this.userdoc_id).update({
          ProjectGroupsJoined: firebase.firestore.FieldValue.arrayUnion(this.doc_id)
        })
        this.teleShow = !this.teleShow
    }},
    deletePost: function() {
      this.hide_post = !this.hide_post
      database.collection("Project Group").doc(this.doc_id).update({
        hidden: true
      })
    },
    byUser: function(userId) {
        if (userId === this.UserName) {
          return true;
        } else {
          return false;
        }
    },
    showjoin: function() {
      if (this.byUser(this.userId)) {
        return false;
      } else {
        if (this.post_status === "Closed") {
          return false;
        }
        return true;
      }
    }
  },
  computed: {
    disp_date() {
      return moment(this.post_date).fromNow();
    },
        
  },
  created: function () {
    var vm = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        vm.user = user;
        vm.email = user.email;
        vm.email = vm.email.substring(0, vm.email.indexOf("@"))
        const emailToCheck = vm.email;
        database.collection('Users')
            .where('NUSNET' , '==', emailToCheck)
            .get().then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                  vm.userdoc_id = doc.id;
                  vm.UserName = doc.data().UserName;
                })
            })
            .then(database.collection('Users').where('UserName' , '==',  vm.userId ) 
            .get().then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    vm.creatorTele = doc.data().Telegram;
                })}))
            .catch(function(error) {
                console.log("Error getting documents: ", error);
             });
      } else {
        vm.user = null;
      }
    });
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

#post_body {
  text-align: left
}

#date {
  color: grey;
}

.faicon {
  margin-right: 10px;
}
#post_author {
  text-align: left;
}
#members {
  text-align: left;
  font-size:12px;
}

#delete {
  display: inline-block;
  top: 0px;
  right: 0px;
}


#collapse-button-1 {
  margin-top:10px;
  height: 20%;
}
#collapse-1 {
  font-size: 10px;
}
</style>