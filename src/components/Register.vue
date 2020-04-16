<template>
<div class="sign-up">
    <div id="nav">
      <nb></nb>
      </div>
    <br>
    <h3>Create a new account</h3><br>
    <b-modal v-model="usernamemodal" >This username is already taken, please use a different one.</b-modal>
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

    <b-row class ="justify-content-left" inline>
      <b-col cols = "12">
      <b-form-group label-cols-lg="4"  label="Gender:" label-align-sm="right" label-align-lg="right">
        <b-form-radio-group class="pt-2" v-model="form.Gender" :options="['Male', 'Female']" align="left" required style="width: 230px;">
        </b-form-radio-group>
      </b-form-group>
      </b-col>
      </b-row>

    <b-form-group label="Faculty:"  label-cols-lg="4" label-align-lg="right" label-align-sm="right">
      <b-form-select
        v-model="form.Faculty"
        :options="Faculty"
        required  
        display:inline-block
    
        style="width: 500px;"
        
      ></b-form-select>
    </b-form-group>  
    
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
        Faculty: [{ text: 'Select One', value: null }, 'Faculty of Arts and Social Sciences', 'Faculty of Science', 'School of Computing', 'School of Design and Environment', "School of Business", "Faculty of Engineering"],
        confirm_password: '',
        usernamemodal: false,
        usernameboolean: false,
        form: {
          FirstName:'',
          GroupsCreated:[],
          GroupsJoined:[],
          LastName:'',
          Gender:'',
          Major:'',
          NUSNET: '',
          Password: '',
          Telegram: '',
          UserName: '',
          Year: '',
          Picture: "https://i.picsum.photos/id/58/125/125.jpg"
        }
      }
    },
    methods: {
      checkUsername() {
        console.log("checking username " + this.form.UserName)
        database.collection('Users')
            .where('UserName' , '==', this.form.UserName.toLowerCase())
            .get().then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                  console.log("found!" + doc.data().UserName);
                  this.usernameboolean=false;                  
                })
            }) 
            .catch(function(error) {
              console.log("Error getting documents: ", error);
              this.usernameboolean = true;
             });
        return this.usernameboolean;
      },
      insertintodatabase() {
        this.form.FirstName = this.form.FirstName.charAt(0).toUpperCase() + this.form.FirstName.slice(1).toLowerCase();
        this.form.LastName = this.form.LastName.charAt(0).toUpperCase() + this.form.LastName.slice(1).toLowerCase();
        this.form.Major = this.form.Major.charAt(0).toUpperCase() + this.form.Major.slice(1).toLowerCase();
        this.form.NUSNET = this.form.NUSNET.toUpperCase();
        this.form.UserName = this.form.UserName.toLowerCase();
        database.collection('Users').add(this.form)
      },
      signUp () {
        this.checkUsername();
        if (this.usernameboolean === false) { this.usernamemodal = !this.usernamemodal }
        else {
          firebase.auth().createUserWithEmailAndPassword(this.form.NUSNET.toUpperCase()+"@u.nus.edu", this.form.Password).then(()=> {
            this.insertintodatabase();}).then(() => {
            this.$router.replace('/Sign-In');
          }).catch((err) => {
            alert(err.message)
          });
        }
    }}
  }
</script>