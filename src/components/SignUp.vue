<template>
       
    <div>
      <nb></nb>
        <form class="form-signin">
            <div class="text-center mb-4">
                <img src="https://sagehouse.sg/wp-content/uploads/2017/08/national-university-of-singapore.jpg" alt="" width="300" height="200">
                <p> Sign in with your <b>NUS Email</b> and Password </p>

            </div>
        </form>

        <div class="form-label-group">
            <label for="inputEmail">Email address</label>
            <input v-model="message" v-on:keyup.enter="check" placeholder="Email Address" type="email">
            <p v-if="message == empty">{{error}}</p>
        </div>
        <div class="form-label-group">
            <label for="inputPassword">Password</label>
            <input v-model="password" placeholder="Password" type="password">
        </div>

        <div>
            <b-form-checkbox
              id="checkbox-1"
              v-model="status"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
            >
            Remember Me
            </b-form-checkbox>
        </div>

        <br>
        Not Registered? Click <router-link to="/Register"><u>here</u></router-link> to sign up!
        <br>
        <br>


        <div class="checkbox mb-3">
            <button><router-link to="/group-page">Sign In</router-link></button>
        </div>
        
        
    </div>



</template>

<script>
import NavBar from './NavBar.vue'
export default {
  data() {
    return {
    message: "",
    empty: "",
    error: "Email cannot be empty!",
    password:"",
    status: 'not_accepted'
    }
  },
  components: {
    'nb':NavBar
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
height: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 60px;
  background-color: #9bbeee;
}

.bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

@media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
}


.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  height: 3rem;
  width: 20rem;

}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  pointer-events: none;
  cursor: text; /* Match the input under the label */
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
  
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 2.25rem;
  padding-bottom: 1.25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  font-size: 12px;
  color: #777;
}

/* Fallback for Edge
-------------------------------------------------- */
@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE
-------------------------------------------------- */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }
  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}

</style>