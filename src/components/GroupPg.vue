<template>
<div> <nb></nb>
<h4> LoNUS Postings </h4>

<!-- Selection screen between Project and Study Groups; Default is Project Groups -->
<b-container fluid = "lg">
    <div class= "radio">
    <h3 id="whatgroup">What kind of group are you looking for?</h3>
      <b-form-radio-group
        id="radio-group-1"
        v-model="selected_type"
        :options="group_types"
        name="radio-options"
      ></b-form-radio-group> 
    </div> 

    
<b-container fluid = "md" id="filterbox">      
   <!-- Filter and sort options for Project -->
   <div v-show="selected_type === 'Project'">
        <div class="row justify-content-center align-items-center h-100">
                <b-form inline>
                    <!-- Search option -->
                    <b-input
                        id="b-form-input-module"
                        class = "mb-2 mr-sm-2 mb-sm-0 search"
                        placeholder="Enter module code"
                        v-model="mod"
                        v-on:keyup.enter = "searchModule()"
                    ></b-input>    

                    <!-- Sorting options -->
                    <b-form-select 
                    v-model="selected_sort" 
                    :options="sort" 
                    class = "mb-2 mr-sm-2 mb-sm-0">
                    </b-form-select>
                </b-form>  
        </div>
   </div>

    <div class="row justify-content-center align-items-center h-100">
        <!-- Filter and sort options for Study Groups -->
        <div v-show="selected_type === 'Study'">
            <b-form inline>
            <b-form-select v-model="selected_area" :options="areas" label-field= "location" class = "mb-2 mr-sm-2 mb-sm-0"></b-form-select>
            <b-form-select v-model="selected_sort" :options="sort" class = "mb-2 mr-sm-2 mb-sm-0"></b-form-select>
            </b-form>
        </div>
    </div>
</b-container>
    
    <!-- change userId later.... -->

    <br>
    <!-- This is where the project group posts will show up -->
    <div v-show="selected_type === 'Project'">
        <div v-show = "searchResults">
            <b-button v-on:click = "fetchProject()">Clear Search Results</b-button>
            <h3 v-show = "noResults">No results for {{error_mod}}</h3>
        </div>
        <br>

        <b-row align-h="center">
        
                <Post v-for = "(item) in projectList" v-bind:key = "item.id"  
                v-bind:module = "item.ModuleCode"
                v-bind:userId = "A000001"
                v-bind:post_desc = "item.Description"
                v-bind:post_status = "item.Limit > item.UserNames.length ? 'Open' : 'Closed'"
                v-bind:post_date = "item.DatePosted.toDate()"
                v-bind:members = "item.UserNames"
                ></Post>

        </b-row>
     </div>

    <!-- This is where the study group posts will show up -->
    <br>
    <div v-show="selected_type === 'Study'">
      <b-row align-h="center" >
            <StudyPost v-for = "(item) in studyList" 
            :key = "item.id"
            :groupName = "item.GroupName"
            :userId = "A000001" 
            :post_desc = "item.Description"
            :post_status= "item.UserNames.length < item.Limit ? 'Open' : 'Closed'"
            :post_date = "item.DatePosted.toDate()"
            :location = "item.Location"
            :members = "item.UserNames">
            </StudyPost>    

      </b-row>
    </div>
  </b-container>    
  </div>
</template>


<script>
import Post from './Post.vue'
import StudyPost from './StudyPost.vue'
import NavBar from './NavBar.vue'
import database from '../firebase.js'

export default {
    components: {
        Post,
        StudyPost,
        'nb':NavBar
    }, methods: {
        fetchStudy: function() {
            this.studyList.length = 0;
            let studyGrp = {}
            database.collection('Study Group').get().then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    studyGrp = doc.data()
                    studyGrp.id = doc.id
                    this.studyList.push(studyGrp)
                })
            })
        },
        fetchProject: function() {
            this.projectList.length = 0;
            if (this.searchResults) {
                this.searchResults = false;
            }
            let projectGrp = {}
            database.collection('Project Group').get().then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    projectGrp = doc.data()
                    projectGrp.id = doc.id
                    this.projectList.push(projectGrp)
                })
            })
        },
        searchModule: function() {
            this.projectList.length = 0; // clear the exisitng project list
            let projectGrp = {};
           
            database.collection("Project Group").where("ModuleCode", "==", this.mod).get().then(
                (querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        projectGrp = doc.data()
                        projectGrp.id = doc.id
                        this.projectList.push(projectGrp)
                })
            }).finally(() => {
                this.searchResults = true;
                // if there is no matching results
                if (this.projectList.length == 0) {
                    this.error_mod = this.mod;
                    this.noResults = true;
                }
            })
           }
    }
    , data() {
        return {
            studyList: [],
            projectList: [],
            selected_type: "Project",
            group_types: [ 
                {text: 'Project', value: 'Project'},
                {text: 'Study', value: 'Study'}
            ], 
            selected_sort: "New",
            sort:[
                {value:'New', text: 'Sort By'},
                {value:'New', text:'Date Posted, Newest First'},
                {value:'Old', text:'Date Posted, Oldest First'}],
            mod: "",
            error_mod: "",
            selected_area: "",
            areas:[
                {value:"", text: '???'}
            ],
            noResults: false,
            searchResults: false
        }
    },
    created() {
        this.fetchStudy();
        this.fetchProject();
    },
    watch: {
        selected_sort: function(change_sort) {
            this.projectList.length = 0; // clear the exisitng project list
            let projectGrp = {}
            if (change_sort === "Old") {
                database.collection('Project Group').orderBy('DatePosted').get().then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    projectGrp = doc.data()
                    projectGrp.id = doc.id
                    this.projectList.push(projectGrp)
                })
            })} else if (change_sort === "New") {
                database.collection('Project Group').orderBy('DatePosted', "desc").get().then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    projectGrp = doc.data()
                    projectGrp.id = doc.id
                    this.projectList.push(projectGrp)
                })
            })
            }
        },
        selected_area: function(change_area) {
            this.studyList.length = 0;
            let studyGrp = {};
            
            if (change_area == "") {
                this.fetchStudy();
            } else {
            // otherwise filter based on options
                database.collection("Study Group").where("Location", "==", change_area).get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        studyGrp = doc.data()
                        studyGrp.id = doc.id
                        this.studyList.push(studyGrp)
                    })
                })
            }
        }
    }
}

</script>

<style scoped>
#search-cust {
    width: 100%
}
#whatgroup {
    font-family: sans-serif;
    padding-top:0px;
}
#radio-group-1 {
    margin-bottom: 10px
}

#filterbox {
    
    padding-top: 20px;
    padding-bottom: 2px;

}
.filters {
    text-align: left;
    display: inline-block;
    background-color: snow;
}

.radio {
    padding-top: 10px; 

}

h4{
  background-color: black;
  color: white;
  padding-top: 1rem;
  padding-bottom: 1rem;
}


</style>