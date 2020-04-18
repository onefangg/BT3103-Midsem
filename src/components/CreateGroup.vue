<template>
<div>   
    <nb></nb>
    <h4> Create a LoNUS group </h4>
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
            label-align-lg="right" label-align-sm="right"
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
            label-align-lg="right" label-align-sm="right"
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
            label-align-lg="right" label-align-sm="right"
            label="Size Limit:"
            label-for="input-4">
            <b-form-input
            id="input-4"
            v-model.number="proj.Limit"
            type="number"
            required
            placeholder="Enter Maximum Number of Members Required"
            ></b-form-input>
        </b-form-group>

    <b-form-group
            id="input-group-1"
            label-cols-sm="2"
            label-cols-lg="3"
            label-align-lg="right" label-align-sm="right"
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
            class="mb-2"
            ></b-form-tags>
        </b-form-group>
        
    </div>


    <div v-show="create_type === 'study'">
        <b-form-group id="input-group-33" label="Faculty:" label-for="input-3" label-cols-sm="2" label-cols-lg="3" label-align-lg="right" label-align-sm="right">
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
            label-align-lg="right" label-align-sm="right"
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
            label-align-lg="right" label-align-sm="right"
            label="Description:"
            label-for="input11">
            <b-form-input
            id="input-11"
            v-model="study.Description"
            type="description"
            required
            placeholder="Enter Description. For privacy reasons, we do not recommend specifying the exact location of the study group."
            ></b-form-input>
        </b-form-group>

        <b-form-group
            id="input-group-1"
            label-cols-sm="2"
            label-cols-lg="3"
            label-align-lg="right" label-align-sm="right"
            label="Location:"
            label-for="input-15">
            <b-form-select
            id="input-33"
            v-model="study.Location"
            :options="locations"
            required
            name= "type"
            ></b-form-select>
        </b-form-group>

        <b-form-group
            id="input-group-1"
            label-cols-sm="2"
            label-cols-lg="3"
            label-align-lg="right" label-align-sm="right"
            label="Size Limit:"
            label-for="input-13">
            <b-form-input
            id="input-13"
            v-model.number="study.Limit"
            type="number"
            required
            placeholder="Enter Maximum Number of Members Required"
            ></b-form-input>
        </b-form-group>
        
        <b-form-group
            id="input-group-1"
            label-cols-sm="2"
            label-cols-lg="3"
            label-align-lg="right" label-align-sm="right"
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
import firebase from 'firebase'

export default {
    components: {
        'nb' : NavBar
    },
    data() {
        return {      
            user: null,
            email: '',
            currUser: '',
            userdoc_id: '',
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
                Description:'',
                Limit:null,
                NumberOfMembers:0,
                UserNames:[],
                DatePosted:null,
                Location:null,
                GroupName:'',
                Poster:''
            },
            create_type: 'project',
            faculties: [{ text: 'Select Faculty', value: null }, 'Any Faculty', 'Faculty of Arts and Social Sciences', 'Faculty of Science', 'School of Computing', 'School of Design and Environment', "School of Business", "Faculty of Engineering"],
            locations: [{ text: 'Select Location', value: null }, 'NUS', 'North', 'South', 'East', 'West']
        }
    },
    methods : {
        submit: function() {
            const userdocid = this.userdoc_id
            if (this.create_type==='study'){
                this.getNowstu()
                this.setPosterstu()
                this.study.UserNames.push(this.currUser) 
                this.getNumMembersStu()               
                database.collection('Study Group').add(this.study)
                database.collection("Study Group")
                    .orderBy("DatePosted", 'desc')
                    .limit(1).onSnapshot((snap) => {
                        snap.forEach(function(doc) {
                            database.collection("Users").doc(userdocid).update({
                            StudyGroupsCreated: firebase.firestore.FieldValue.arrayUnion(doc.id)
                        })
                    })})
                console.log("DONE!")
                alert("Group Successfully Created!")
                this.$router.push('/Group-Page') 
            } else{
                this.getNowproj()
                this.setPosterproj()
                this.proj.ModuleCode = this.proj.ModuleCode.toUpperCase()
                this.proj.UserNames.push(this.currUser)
                this.getNumMembersProj()
                database.collection('Project Group').add(this.proj)
                database.collection("Project Group")
                    .orderBy("DatePosted", 'desc')
                    .limit(1).onSnapshot((snap) => {
                        snap.forEach(function(doc) {
                            database.collection("Users").doc(userdocid).update({
                            ProjectGroupsCreated: firebase.firestore.FieldValue.arrayUnion(doc.id)
                        })
                    })})
                console.log("DONE!")
                alert("Group Successfully Created!")
                this.$router.push('/Group-Page') 
            }
            
        },
        getNumMembersStu: function(){
            this.study.NumberOfMembers = this.study.UserNames.length
        },
        
        getNumMembersProj: function(){
            this.proj.NumberOfMembers = this.proj.UserNames.length
        },
        addMemberproj: function(){
            this.proj.UserNames.push(this.currUser);
        },
        addMemberstudy: function(){
            this.study.UserNames.push(this.currUser);
        },
        getNowproj: function() {
               
                    this.proj.DatePosted = new Date();
                },
        getNowstu: function() {
                    
                    this.study.DatePosted = new Date();
                },
        setPosterstu: function(){
            this.study.Poster = this.currUser;
        },
        setPosterproj: function(){
            this.proj.Poster = this.currUser;
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
                    vm.currUser = doc.data().UserName;
                    vm.userdoc_id = doc.id;
                })
            })
            .catch(function(error) {
                console.log("Error getting documents on creation: ", error);
             });
      } else {
        vm.user = null;
      }
    });
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
  background-color: #007bff;
  color: white;
  font-weight: 600;
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