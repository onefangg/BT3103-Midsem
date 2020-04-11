<template>
<div class="sign-up">
    <div id="nav">
      <nb></nb>
      </div>
    <br>
    <h3>Create a new account</h3><br>

    <b-form-group label="Username:" label-for="input-2" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            v-model="username"
            required
            placeholder="Enter Username"
            style="width: 230px;"
            
          ></b-form-input>
        </b-form-group>

    <b-row class ="justify-content-center" inline>
          
          <b-col cols = "3">
            <b-form-group label="First Name:" label-for="input-3" label-cols-lg="4" label-align-lg="right" label-align-sm="center">
              <b-form-input
                v-model="firstname"
                required
                placeholder="First Name"
                style="width: 230px;"
                
              ></b-form-input>
            </b-form-group>
          </b-col>
          
        <b-col cols = "3">
            <b-form-group label="Last Name:" label-cols-lg="4" label-align-lg="right" label-align-sm="center">
              <b-form-input
                v-model="lastname"
                required
                placeholder="Last Name"
                style="width: 230px;"
                
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>

    <b-form-group label="Major:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            v-model="major"
            required
            placeholder="Enter Major"
            style="width: 230px;"
            
          ></b-form-input>
           </b-form-group>

    <b-form-group label="Year:" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            v-model="year"
            required
            placeholder="Enter Year of Study"
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
            v-model="email"
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
          v-model="password"
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
      <h6 v-if="password == '' || confirm_password ==''"></h6>
      <h6 v-else-if="password != confirm_password">Passwords do not match</h6>
      <h6 v-else> Passwords matches </h6>
      </b-form-group>

    <b-button type="submit" variant="primary" v-on:click="signUp">Sign Up!</b-button>
  </div>
</template>

<script>
  import firebase from 'firebase'
   import NavBar from './NavBar.vue'
  export default {
    name: 'signup',
    components: {
        'nb':NavBar
      },
    data () {
      return {
        username: '',
        firstname:'',
        lastname:'',
        email: '',
        password: '',
        confirm_password: '',
        major:'',
        year: ''
      }
    },
    methods: {
      signUp () {
        firebase.auth().createUserWithEmailAndPassword(this.email+"@u.nus.edu", this.password).then(()=> {
          this.$router.replace('/LoginTest')
        }).catch((err) => {
          alert(err.message)
        });
        
      }
    }
  }
</script>