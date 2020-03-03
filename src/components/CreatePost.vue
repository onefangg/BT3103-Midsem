<template>
<div>   
    <nb></nb>
    <h4> Create a LoNUS post </h4>
    <br>
    <div>
        
        <b-form @submit = "submit">
                
                <b-form-radio-group  id ='radio' inline v-model="create_type">
                   Choose Type of Group:  
                    
                    <b-form-radio value = 'project'>Project Group</b-form-radio>
                    <b-form-radio value = 'study'>Study Group</b-form-radio>
                   
                </b-form-radio-group>
            <br>
            <div v-show="create_type === 'project'">
            <b-row v-for = 'p in project_details' :key = 'p'>
                <b-col id='name' sm = "3">
                    <label id = 'input-label' :for = "`${p}`">{{p}}</label>
                </b-col>
                <b-col id='box' sm = "6">
                    <b-form-input placeholder = "Input here"/>
                </b-col>
            </b-row> </div>
             <div v-show="create_type === 'study'">
            <b-row v-for = 'p in study_details' :key = 'p'>
                <b-col id='name' sm = "3">
                    <label id = 'input-label' :for = "`${p}`">{{p}}</label>
                </b-col>
                <b-col id='box' sm = "6">
                    <b-form-input placeholder = "Input here"/>
                </b-col>
            </b-row> </div>
            <br>
            <b-button variant = 'primary' type = 'submit'>Submit</b-button>
        </b-form></div>
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
            study_details: [
                'Group Name',
                'Group Description',
                'Current Number of Members',
                'Maximum Number of Members',
                'Faculty (Optional)',
                'Location (Optional)'
            ],project_details: [
                'Module Code',
                'Group Description',
                'Current Number of Members',
                'Maximum Number of Members'
            ],
            create_type: 'project'
        }
    },
    methods : {
        submit: function() {
            alert("Post Successfully Created!")
        }
    
    }
}
</script>

<style scoped>
#input-label {
    font-weight: bold
}

#name{
    padding:18px;   
    padding-left:190px;
    padding-right:2px;
}

#box{
    padding:10px;
    background-color: white;
}

h4{
  background-color: black;
  color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

#radio {
    padding-top:10px;
}

</style>