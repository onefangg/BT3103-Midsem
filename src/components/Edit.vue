<template>
<div class="edit">
    <div id="nav">
      <nb></nb>
      </div>
    <br>
    <b-modal v-model="showModal" ok-only>
        Changes submitted successfully!
        <template v-slot:modal-footer>
        <div class="w-100">
          <router-link :to= "{name: 'profile', params: {userId: details.UserName}}">
            <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="showModal=false"
          > 
            Close
          </b-button></router-link>
        </div>
      </template>
    </b-modal>
    <h3>Edit Account Info</h3><br>

    <b-form-group label="Username:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            v-model="details.UserName"
            required
            style="width: 230px;"
          ></b-form-input>
    </b-form-group> 
    <b-form-group label="First Name:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            v-model="details.FirstName"
            required
            style="width: 230px;"   
          ></b-form-input>
    </b-form-group>

    <b-form-group label="Last Name:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            v-model="details.LastName"
            required
            style="width: 230px;"
          ></b-form-input>
    </b-form-group>

    <b-form-group label="Major:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            v-model="details.Major"
            required
            style="width: 230px;"
          ></b-form-input>
    </b-form-group>

    <b-form-group label="Year:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            v-model="details.Year"
            required
            type="number"
            style="width: 230px;"
          ></b-form-input>
    </b-form-group>

        <b-form-group label="Telegram username:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            v-model="details.Telegram"
            required
            style="width: 230px;"
          ></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="primary" v-on:click="submitChanges">Submit changes</b-button>
  </div>
</template>

<script>
  import firebase from 'firebase'
  import NavBar from './NavBar.vue'
  import database from '../firebase.js'
  export default {
    name: 'signup',
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
          Telegram: '',
          UserName: '',
          Year: ''
        }
      }
    },
    methods: {
      submitChanges: function() {
        database.collection('Users')
          .doc(this.id)
          .update({ 
              FirstName: this.details.FirstName,
              LastName: this.details.LastName,
              Major: this.details.Major,
              Telegram: this.details.Telegram,
              UserName: this.details.UserName,
              Year: this.details.Year   
          })
          .then(() => {
              console.log('account details updated!')
              this.showModal = true;
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
            .where('NUSNET' , '==', emailToCheck.toUpperCase())
            .get().then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    vm.id = doc.id
                    vm.details.FirstName = doc.data().FirstName;
                    vm.details.LastName = doc.data().LastName;
                    vm.details.Major = doc.data().Major;
                    vm.details.UserName = doc.data().UserName;
                    vm.details.Year = doc.data().Year;
                    vm.details.Telegram = doc.data().Telegram;
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