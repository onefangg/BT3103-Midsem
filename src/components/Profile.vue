<template>
  <div>
    <nb>
    </nb>

    <div id="my-container" class="hi" align="center">
      <div class="img" id='main'
        style="    background-image: linear-gradient(150deg, rgba(63, 174, 255, .3)15%, rgba(63, 174, 255, .3)70%, rgba(63, 174, 255, .3)94%), url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg);height: 70px;width:1220px;background-size: cover;">
      </div>
      <div class="card social-prof" id='img1' style = "height: 290px">
        <div class="card-body">
          <div class="wrapper">
            <b-img v-bind:src="details.Picture" alt="" class="user-profile" width="100px" height="100px"
              rounded="circle"></b-img>
            <h4 id = "name_field">{{details.LastName}} {{details.FirstName}}</h4>
            <h6 id = "username_field">{{$route.params.userId}}</h6>
            <h6 id = "yearmajor_field">Year {{details.Year}} {{details.Major}}</h6>
            <b-button id="popover-reactive-1" v-on:click="changePic()">Change My Picture</b-button>

          </div>

          <b-popover target="popover-reactive-1" triggers="click" :show.sync="popoverShow" placement="auto"
            container="my-container" ref="popover" @show="onShow" @shown="onShown" @hidden="onHidden">

            <template v-slot:title>
              <b-button @click="onClose" class="close" aria-label="Close">
                <span class="d-inline-block" aria-hidden="true">&times;</span>
              </b-button>
              Change my profile picture
            </template>

            <div>
              <b-form-group label="URL" label-for="popover-input-1" label-cols="3" :state="input1state" class="mb-1"
                description="Enter URL" invalid-feedback="This field is required">
                <b-form-input ref="input1" id="popover-input-1" v-model="input1" :state="input1state" size="sm">
                </b-form-input>
              </b-form-group>

              <b-button @click="onClose" size="sm" variant="danger">Cancel</b-button>
              <b-button @click="onOk" size="sm" variant="primary">Ok</b-button>
            </div>
          </b-popover>



        </div>
      </div>
      <div class='hi'>
        <b-row>
          <b-col>
            <!-- This card contains 4 tabs - Dashboard (Active), Profile, Group Created, Groups Joined  -->
            <b-card no-body>
              <!-- setting active makes it the default tab -->
              <b-tabs pills card active>
                <b-tab title='User Dashboard' id='dashboard'>
                  <div id='chart'>
                    <loginChart></loginChart>
                  </div>
                  <div id='chart'>
                    <fc></fc>
                  </div>
                  <div id='chart'>
                    <gj></gj>
                  </div>
                </b-tab>
                <b-tab title="Profile">
                  <b-row alight-h="right">
                    <b-button variant="light" to="/Edit-Details">Edit Details</b-button>
                  </b-row>
                  <br>
                  
                </b-tab>

                <b-tab title='Group Joined' >
                  <b-row align-h="left"></b-row>
                </b-tab>

                <b-tab title='Groups Created'>
                  <b-row align-h="left"></b-row>
                </b-tab>
                
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>

</template>

<script>
  import NavBar from './NavBar.vue'
  import firebase from 'firebase'
  import database from '../firebase.js'
  import loginChart from '../LoginChart.js'
  import FacultyComparisons from '../FacultyComparison.js'
  import GroupsJoinedChart from '../GroupsJoinedChart.js'

  export default {
    name: 'Profile',
    components: {
      'nb': NavBar,
      loginChart,
      'fc': FacultyComparisons,
      'gj': GroupsJoinedChart
    },
    data() {
      return {
        showModal: false,
        user: null,
        email: '',
        id: '',
        details: {
          FirstName: '',
          GroupsCreated: [],
          GroupsJoined: [],
          LastName: '',
          Major: '',
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
      submitChanges: function () {
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
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          vm.user = user;
          vm.email = user.email;
          vm.email = vm.email.substring(0, vm.email.indexOf("@"))
          const emailToCheck = vm.email;
          database.collection('Users')
            .where('NUSNET', '==', emailToCheck)
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
            .catch(function (error) {
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

  #img1 {
    height: 250px;
    width: 1220px
  }

  .hi {
    padding-left: 10%;
    padding-right: 10%;
  }

  #chart {
    height: 180px;
    width: 380px;
    float: left;
  }

  #info {
    height: 1000px;
    width: 1230px
  }

  #dashboard {
    height: 500px
  }
  /* Styling the name */
  #name_field {
    padding-top: 5px;
    font-family: "sans-serif"; 
  }
  /* Styling username */
  #username_field {
    font-style:italic;
  }
  /* Styling year and major  */
  #yearmajor_field {
    font-family: "sans-serif";
    font-size:120%;
  }
</style>