<template>

    <div id="register">
      <div id="nav">
      <nb></nb>
      <h4> Create your LoNUS Account </h4>
      </div>
      

      <b-form  @reset="onReset" v-if="show">
        <b-form-group id="input-group-2" label="Username:" label-for="input-2" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            id="input-2"
            v-model="form.name"
            required
            placeholder="Enter Username"
            style="width: 230px;"
            
          ></b-form-input>
        </b-form-group>

        
        
        <b-row class ="justify-content-center" inline>
          
          <b-col cols = "3">
            <b-form-group id="input-group-3" label="First Name:" label-for="input-3" label-cols-lg="4" label-align-lg="right" label-align-sm="center">
              <b-form-input
                id="input-2"
                v-model="form.firstname"
                required
                placeholder="First Name"
                style="width: 230px;"
                
              ></b-form-input>
            </b-form-group>
          </b-col>
          
        <b-col cols = "3">
            <b-form-group id="input-group-4" label="Last Name:" label-for="input-4" label-cols-lg="4" label-align-lg="right" label-align-sm="center">
              <b-form-input
                id="input-2"
                v-model="form.lastname"
                required
                placeholder="Last Name"
                style="width: 230px;"
                
              ></b-form-input>
            </b-form-group>


          </b-col>
        </b-row>
          
        <b-form-group id="input-group-8" label="Major:" label-for="input-8" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            id="input-8"
            v-model="form.major"
            required
            placeholder="Enter Major"
            style="width: 230px;"
            
          ></b-form-input>
           </b-form-group>


        <b-form-group id="input-group-9" label="Year:" label-for="input-9" label-cols-lg="4" label-align-lg="right" label-align-sm="right">
          <b-form-input
            id="input-9"
            v-model="form.year"
            required
            placeholder="Enter Year of Study"
            style="width: 230px;"
            
          ></b-form-input>
        </b-form-group>


        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          label-cols-lg="4"
          label-align-lg="right" 
          label-align-sm="center"

        >
        <b-input-group size="md" append="@u.nus.edu" style="width: 340px">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="text"
            required
            placeholder="Enter email"

          ></b-form-input>
        </b-input-group>
        </b-form-group>
        

        <b-form-group
        id="input-group-5"
        label="Password:"
        label-for="input-5"
        label-align-lg="right"
        label-align-sm="center"
        label-cols-lg="4"
        
      >
        <b-form-input
          id="input-5"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter your desired password"
          style="width:230px"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-6"
        label="Confirm Password:"
        label-for="input-6"
        label-align-lg="right"
        label-align-sm="center"
        label-cols-lg="4"
        
      >
        <b-form-input
          id="input-5"
          v-model="form.confirm_password"
          type="password"
          required
          placeholder="Confirm password"
          style="width:230px"
        ></b-form-input>
        <br>
      <h6 v-if="form.password == '' || form.confirm_password ==''"></h6>
      <h6 v-else-if="form.password != form.confirm_password">Passwords do not match</h6>
      <h6 v-else> Passwords matches </h6>
      </b-form-group>

        
  
        <b-button  type="submit" variant="primary" v-on:click = "onSubmit(form)" >Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </template>

  <script>
  import NavBar from './NavBar.vue'
    export default {
      components: {
        'nb':NavBar
      },
      data() {
        return {
          form: {
            email: '',
            name: '',
            firstname:'',
            lastname:'',
            password:'',
            confirm_password:'',
            flag:false
          },
          show: true
        }
      },
      methods: {
        onSubmit: function(evt) {
          if (evt.password == evt.confirm_password) {
            alert("Account Created")
            this.$router.push('/SignIn') 

          } else {
            alert("fail)")
          }
        },
        onReset: function(evt) {
          evt.preventDefault()
          // Reset our form values
          this.form.email = ''
          this.form.name = ''
          this.form.firstname = ''
          this.form.lastname = ''
          this.form.password= ''
          this.form.confirm_password= ''
          // Trick to reset/clear native browser form validation state
          this.show = false
          this.$nextTick(() => {
            this.show = true
          })
        }
      }
    }
  </script>

<style scoped>
#register {
  margin: 0 auto;
  align-content: center;
  padding-bottom: 50px;
}

#nav {
padding-bottom: 50px

}


h6 {
  text-align: left;
}

h4{
  background-color: black;
  color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

</style>


