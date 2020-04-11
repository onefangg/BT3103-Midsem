<template>
<div>   
    <nb></nb>
    <h4> Create a LoNUS post </h4>
    <br>
    <div>
        
                <b-form-radio-group  id ='radio' inline v-model="create_type">
                   Choose Type of Group:  
                    
                    <b-form-radio value = 'project'>Project Group</b-form-radio>
                    <b-form-radio value = 'study'>Study Group</b-form-radio>
                   
                </b-form-radio-group>
            <br>
            <div v-show="create_type === 'project'">
                <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Module Code:"
                    label-for="input-1">
                    <b-form-input
                    id="input-1"
                    v-model="proj.ModuleCode"
                    type="module"
                    required
                    placeholder="Enter Module Code"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Description:"
                    label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="proj.Description"
                    type="description"
                    required
                    placeholder="Enter Description"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Size Limit:"
                    label-for="input-4">
                    <b-form-input
                    id="input-4"
                    v-model.number="proj.Limit"
                    type="max"
                    required
                    placeholder="Enter Maximum Number of Members Required"
                    ></b-form-input>
                </b-form-group>

           <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Current Members:"
                    label-for='inputmembers1'>
                    <b-form-tags
                    id="inputmembers1"
                    input-id="tags-remove-on-delete1"
                    :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
                    v-model="proj.UserNames"
                    separator=" "
                    placeholder="Enter Usernames of Current Members"
                    remove-on-delete
                    no-add-on-enter
                    class="mb-2"
                    ></b-form-tags>
                </b-form-group>
                
            </div>


            <div v-show="create_type === 'study'">
               <b-form-group id="input-group-33" label="Faculty:" label-for="input-3" label-cols-sm="2" label-cols-lg="3">
                    <b-form-select
                    id="input-33"
                    v-model="study.Faculty"
                    :options="faculties"
                    required
                    name= "type"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Module Code:"
                    label-for="input-10">
                    <b-form-input
                    id="input-10"
                    v-model="study.ModuleCode"
                    type="module"
                    required
                    placeholder="Enter Module Code"
                    ></b-form-input>
                </b-form-group>

                  <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Study Group Name:"
                    label-for="input-12">
                    <b-form-input
                    id="input-12"
                    v-model="study.GroupName"
                    type="groupname"
                    required
                    placeholder="Enter Group Name"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Description:"
                    label-for="input11">
                    <b-form-input
                    id="input-11"
                    v-model="study.Description"
                    type="description"
                    required
                    placeholder="Enter Description"
                    ></b-form-input>
                </b-form-group>

                <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Location:"
                    label-for="input-15">
                    <b-form-input
                    id="input-15"
                    v-model="study.Location"
                    type="location"
                    required
                    placeholder="Input Study Location"
                    
                    ></b-form-input>
                </b-form-group>


                <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Size Limit:"
                    label-for="input-13">
                    <b-form-input
                    id="input-13"
                    v-model.number="study.Limit"
                    type="max"
                    required
                    placeholder="Enter Maximum Number of Members Required"
                    ></b-form-input>
                </b-form-group>
                
                <b-form-group
                    id="input-group-1"
                    label-cols-sm="2"
                    label-cols-lg="3"
                    label="Current Members:"
                    label-for='inputmembers'>
                    <b-form-tags
                    id="inputmembers"
                    input-id="tags-remove-on-delete"
                    :input-attrs="{ 'aria-describedby': 'tags-remove-on-delete-help' }"
                    v-model="study.UserNames"
                    separator=" "
                    placeholder="Enter Usernames of Current Members"
                    remove-on-delete
                    no-add-on-enter
                    class="mb-2"
                    ></b-form-tags>
                </b-form-group>
                
            </div>


            <b-form @submit = "submit">
                     <b-button variant = 'primary' type = 'submit'>Submit</b-button>
                </b-form>

        </div>
</div>
</template>

<script>
import NavBar from './NavBar.vue'
import database from '../firebase.js'
export default {
    components: {
        'nb' : NavBar
    },
    data() {
        return {
            proj:{
                ModuleCode:'',
                Description:'',
                Limit:null,
                NumberOfMembers:0,
                UserNames:[],
                DatePosted: null,
                Poster: ''
            },
            study:{
                Faculty:null,
                ModuleCode:'',
                Description:'',
                Limit:null,
                NumberOfMembers:0,
                UserNames:[],
                DatePosted:null,
                Location:'',
                GroupName:'',
                Poster:''
            },
            currUser:'',
            create_type: 'project',
            faculties: [{ text: 'Select Faculty', value: null }, 'Computing','FASS', 'Science', 'Engineering','Business','Medicine','Law'],
        }
    },
    methods : {
        submit: function() {
            if (this.create_type==='study'){
                this.getNowstu()
                this.getNumMembersStu()
                this.setPosterstu()
                database.collection('Study Group').add(this.study)
            }
            else{
                this.getNowproj()
                this.getNumMembersProj()
                this.setPosterproj()
                database.collection('Project Group').add(this.proj)
            }
            alert("Post Successfully Created!")
            this.$router.push('/Group-Page') 
        },
        getNumMembersStu: function(){
            this.study.NumberOfMembers = this.study.UserNames.length
        },
        
        getNumMembersProj: function(){
            this.proj.NumberOfMembers = this.proj.UserNames.length
        },
        addMemberproj: function(){
            this.proj.UserNames.push(this.currUser);
            this.currUser=''
        },
        addMemberstudy: function(){
            this.study.UserNames.push(this.currUser);
            this.currUser=''
        },
        getNowproj: function() {
               
                    this.proj.DatePosted = new Date();
                },
        getNowstu: function() {
                    
                    this.study.DatePosted = new Date();
                },
        setPosterstu: function(){
            this.study.Poster = this.study.UserNames[0];

        },

        setPosterproj: function(){
            this.proj.Poster = this.proj.UserNames[0];

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
#input-group-1{
  width: 100%;
  max-width:1300px;
  padding: 20px;
  margin: auto;

}

#memberNames{
    padding-left:10px
}

#input-group-33{
    width: 100%;
  max-width:1300px;
  padding: 20px;
  margin: auto;
}

</style>