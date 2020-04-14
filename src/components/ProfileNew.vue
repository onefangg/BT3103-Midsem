<template>
<div>
<nb>
</nb>

<div id="my-container" class="hi">
    <div class="img" style="    background-image: linear-gradient(150deg, rgba(63, 174, 255, .3)15%, rgba(63, 174, 255, .3)70%, rgba(63, 174, 255, .3)94%), url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg);height: 350px;background-size: cover;"></div>
        <div class="card social-prof">
            <div class="card-body">
                <div class="wrapper">
                    <b-img v-bind:src="details.Picture" alt="" class="user-profile" width="150px" height="150px" rounded="circle"></b-img>
                    <h2>{{details.FirstName}}</h2>
                    <p>I am from {{details.Major}} </p>
                    <b-button id="popover-reactive-1" v-on:click="changePic()">Change My Picture</b-button>

                </div>

                <b-popover
                    target="popover-reactive-1"
                    triggers="click"
                    :show.sync="popoverShow"
                    placement="auto"
                    container="my-container"
                    ref="popover"
                    @show="onShow"
                    @shown="onShown"
                    @hidden="onHidden"
                    >

                    <template v-slot:title>
                        <b-button @click="onClose" class="close" aria-label="Close">
                        <span class="d-inline-block" aria-hidden="true">&times;</span>
                        </b-button>
                        Change my profile picture
                    </template>

                    <div>
                        <b-form-group
                        label="URL"
                        label-for="popover-input-1"
                        label-cols="3"
                        :state="input1state"
                        class="mb-1"
                        description="Enter URL"
                        invalid-feedback="This field is required"
                        >
                        <b-form-input
                            ref="input1"
                            id="popover-input-1"
                            v-model="input1"
                            :state="input1state"
                            size="sm"
                        ></b-form-input>
                        </b-form-group>

                        <b-button @click="onClose" size="sm" variant="danger">Cancel</b-button>
                        <b-button @click="onOk" size="sm" variant="primary">Ok</b-button>
                    </div>
                    </b-popover>



            </div>
        </div>
        
        <b-row>
            <b-col>
                <b-card no-body>
                    <b-tabs pills card>
                        <b-tab title="Profile" active>
                            <b-row alight-h="right">
                                <b-button variant="light" to="/Edit-Details">Edit Details</b-button>
                            </b-row>
                            <br>
                            <b-row align-h="left">
                                <h5>Name: {{details.LastName}} {{details.FirstName}}</h5>
                            </b-row>
                            <b-row align-h="left">
                                <h5>Year and Major: Year {{details.Year}} {{details.Major}}</h5>
                            </b-row>
                        </b-tab>
                        
                        <b-tab title = 'Groups Joined'>
                            <b-row align-h="left" ></b-row>
                        </b-tab>

                         <b-tab title = 'Groups Created'>
                            <b-row align-h="left" ></b-row>
                        </b-tab>
                    </b-tabs>
            </b-card>
        </b-col>
    </b-row>       
</div>
</div>

</template>

<script>
import NavBar from './NavBar.vue'
import firebase from 'firebase'
import database from '../firebase.js'

export default {
    name: 'ProfileNew',
    components: {
        'nb':NavBar
      },
      data () {
      return {
        showModal: false,
        user: null,
        email: '',
        id: '',
        details: {
          FirstName:'',
          GroupsCreated:[],
          GroupsJoined:[],
          LastName:'',
          Major:'',
          NUSNET: '',
          Password: '',
          UserName: '',
          Year: '',
          Picture: ''
        },
        input1: '',
        input1state: null,
        popoverShow: false
      }
    },
    watch: {
      input1(val) {
        if (val) {
          this.input1state = true
        }
      }
    },
    methods: {
        submitChanges: function() {
            database.collection('Users')
                .doc(this.id)
                .update({ 
                    Picture: this.details.Picture   
                })
                .then(() => {
                    console.log('account details updated!')
                    this.showModal = true;
                })
            },
    onClose() {
        this.popoverShow = false
      },
      onOk() {
        if (!this.input1) {
          this.input1state = false
        }
        if (this.input1) {
          this.onClose()
          // Return our popover form results
          this.details.Picture = this.input1
          this.submitChanges()
        }
      },
      onShow() {
        // This is called just before the popover is shown
        // Reset our popover form variables
        this.input1 = ''
        this.input1state = null
      },
      onShown() {
        // Called just after the popover has been shown
        // Transfer focus to the first input
        this.focusRef(this.$refs.input1)
      },
      onHidden() {
        // Called just after the popover has finished hiding
        // Bring focus back to the button
        this.focusRef(this.$refs.button)
      },
      focusRef(ref) {
        // Some references may be a component, functional component, or plain element
        // This handles that check before focusing, assuming a `focus()` method exists
        // We do this in a double `$nextTick()` to ensure components have
        // updated & popover positioned first
        this.$nextTick(() => {
          this.$nextTick(() => {
            (ref.$el || ref).focus()
          })
        })
      }        
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
                    vm.id = doc.id
                    vm.details.FirstName = doc.data().FirstName;
                    vm.details.LastName = doc.data().LastName;
                    vm.details.Major = doc.data().Major;
                    vm.details.UserName = doc.data().UserName;
                    vm.details.Year = doc.data().Year;
                    vm.details.Picture = doc.data().Picture;
                })
            })
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

<style scoped>
body {
    background-color: #f0f6ff;
    color: #28384d;

}

.hi {
    padding-left: 20%;
    padding-right: 20%;
}

</style>
