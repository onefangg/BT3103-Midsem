<template>

  <div>
    <nb></nb>

    <h4> Having issues with LoNUS? Drop us an enquiry to let us help! </h4>

    <b-form-group id="input-group-3" label="Enquiry Type:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.enquiry"
          :options="enquiries"
          required
        ></b-form-select>
      </b-form-group>


    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Subject Line:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.subject"
          type="subject"
          required
          placeholder="Enter Subject Line"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description of Problem:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.description"
          required
          style="height:150px"
          placeholder="Enter Description of Enquiry"
        ></b-form-input>
      </b-form-group>

      

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Send me an Email Confirmation</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary"> Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
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
          checked: []
        },
        enquiries: [{ text: 'Select One', value: null }, 'Account Problems', 'Trouble joining group', 'Trouble forming group', 'Report a User', 'Others'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert('Enquiry Success!')
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.subject = ''
        this.form.description = ''
        this.form.enquiry  = null
        this.form.checked = []
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
  max-width: 800px;
  padding: 20px;
  margin: auto;

}

#input-group-1{
  width: 100%;
  max-width: 800px;
  padding: 20px;
  margin: auto;

}

#input-group-2{
  width: 100%;
  max-width: 800px;
  padding: 20px;
  margin: auto;
  

  
}

#input-group-4{
  padding: 20px;
  margin: auto;
 
}

h4{
  background-color: black;
  color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
}



</style>