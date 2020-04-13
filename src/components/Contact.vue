<template>

  <div>
    <nb></nb>

    <h4> Having issues with LoNUS? Drop us an message to let us help you! </h4>
    <form @submit="onSubmit" @reset="onReset" v-if="show">
    <b-form-group id="input-group-3" label="Enquiry Type:" label-for="input-3" label-cols-sm="2" label-cols-lg="3" label-align-lg="right" label-align-sm="right">
        <b-form-select
          id="input-3"
          v-model="form.enquiry"
          :options="enquiries"
          required
          name= "type"
        ></b-form-select>
      </b-form-group>


    <b-form-group id="input-group-1" label="Subject Line:" label-for="input-1" label-cols-sm="2" label-cols-lg="3" label-align-lg="right" label-align-sm="right">
        <b-form-input
          id="input-1"
          v-model="form.subject"
          type="subject"
          required
          name="subject"
          placeholder="Enter Subject Line"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description of Problem:" label-for="input-2" label-cols-sm="2" label-cols-lg="3" label-align-lg="right" label-align-sm="right">
        <b-form-input
          id="input-2"
          v-model="form.description"
          required
          style="height:100px"
          placeholder="Enter Description of Problem"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-1" label="Preferred Email Address" label-for="input-5" label-cols-sm="2" label-cols-lg="3" label-align-lg="right" label-align-sm="right">
        <b-form-input
          id="input-5"
          v-model="form.email"
          required
          name = "email"
          placeholder="Enter Email Address"
        ></b-form-input>
      </b-form-group>
      

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Send me an Email Confirmation</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button> &nbsp;
      <b-button type="reset" variant="danger">Reset</b-button>
    </form>
    
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import emailjs from 'emailjs-com'
export default {
    components: {
        'nb' : NavBar
    },
    data() {
      return {
        form: {
          subject: '',
          name: '',
          enquiry: null,
          checked: null,
          email:''
        },
        enquiries: [{ text: 'Select One', value: null }, 'Account Problems', 'Trouble joining group', 'Trouble forming group', 'Report a User', 'Others'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        if (this.form.checked!=null){
          emailjs.sendForm('tbbtlonus','contact_form', evt.target, 'user_EAmKC1OvHKyrIWyVgsMbS')
          .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          }, (err) => {
          console.log('FAILED...', err);
         });
        }
        alert('Enquiry Success!')
        this.form.subject = ''
        this.form.description = ''
        this.form.enquiry  = null
        this.form.checked = null
        this.form.email =''
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.subject = ''
        this.form.description = ''
        this.form.enquiry  = null
        this.form.checked = null
        this.form.email =''
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
#input-group-3{
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  margin: auto;

}

#input-group-1{
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  margin: auto;

}

#input-group-2{
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  margin: auto;
  

  
}

#input-group-4{
  padding: 20px;
  margin: auto;
 
}

h4{
  background-color: #007bff;
  color: white;
  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 1rem;
}



</style>