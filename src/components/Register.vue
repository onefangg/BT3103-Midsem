<template>
<div class="sign-up">
    <div id="nav">
      <nb></nb>
      </div>
    <br>
    <h3>Create a new account</h3><br>

    <b-form-group label="Username:" label-for="input-2" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
      <b-form-input
        v-model="form.UserName"
        required
        placeholder="Enter Username"
        style="width: 230px;"
        
      ></b-form-input>
    </b-form-group>

    <b-row class ="justify-content-center" inline>
      <b-col cols = "3">
        <b-form-group label="First Name:" label-for="input-3" label-cols-lg="4" label-align-lg="right" label-align-sm="center">
          <b-form-input
            v-model="form.FirstName"
            required
            placeholder="First Name"
            style="width: 230px;"
          ></b-form-input>
        </b-form-group>
      </b-col>
      
      <b-col cols = "3">
        <b-form-group label="Last Name:" label-cols-lg="4" label-align-lg="right" label-align-sm="center">
          <b-form-input
            v-model="form.LastName"
            required
            placeholder="Last Name"
            style="width: 230px;"
            
          ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <b-form-group label="Major:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
      <b-form-input
        v-model="form.Major"
        required
        placeholder="Enter Major"
        style="width: 230px;"  
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Year:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
      <b-form-input
        v-model="form.Year"
        required
        placeholder="Enter Year of Study"
        type="number"
        style="width: 230px;"    
        ></b-form-input>
      </b-form-group>

    <b-form-group label="Telegram username:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
      <b-form-input
        v-model="form.Telegram"
        required
        placeholder="Enter Telegram username"
        style="width: 230px;"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Email address:"
      label-cols-lg="4"
      label-align-lg="right" 
      label-align-sm="center"
    >
      <b-input-group size="md" append="@u.nus.edu" style="width: 340px">
        <b-form-input
          v-model="form.NUSNET"
          type="text"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-input-group>
    </b-form-group>
        
    <b-form-group
      label="Password:"
      label-align-lg="right"
      label-align-sm="center"
      label-cols-lg="4"
    >
      <b-form-input
        v-model="form.Password"
        type="password"
        required
        placeholder="Enter your desired password"
        style="width:230px"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      label="Confirm Password:"
      label-align-lg="right"
      label-align-sm="center"
      label-cols-lg="4"     
    >
      <b-form-input
        v-model="confirm_password"
        type="password"
        required
        placeholder="Confirm password"
        style="width:230px"
      ></b-form-input>
    <br>
    <b-row><h6 v-if="form.Password == '' || confirm_password ==''"></h6>
    <h6 v-else-if="form.Password != confirm_password">Passwords do not match</h6>
    <h6 v-else> Passwords matches </h6></b-row>
    </b-form-group>
    <b-button type="submit" variant="primary" v-on:click="signUp">Sign Up!</b-button>
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
        confirm_password: '',
        form: {
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
      insertintodatabase() {
        database.collection('Users').add(this.form)
      },
      signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.form.NUSNET+"@u.nus.edu", this.form.Password).then(()=> {
          this.insertintodatabase();}).then(() => {
          this.$router.replace('/Sign-In');
        }).catch((err) => {
          alert(err.message)
        });
      }
    }
  }
</script>