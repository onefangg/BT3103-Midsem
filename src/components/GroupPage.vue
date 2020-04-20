<template>
<div> <nb></nb>
<h4> LoNUS Groups </h4>
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
                        placeholder="Enter Module Code"
                        v-model="mod"
                        v-on:keyup.enter = "searchModule()"
                    ></b-input>    
                    
                    <!-- Find friends; First a warning would be issued and then allow search -->
                    <b-input
                        id="b-form-input-module"
                        class = "mb-2 mr-sm-2 mb-sm-0 search"
                        placeholder="Enter Username"
                        v-model="projfriends"
                        v-on:keyup.enter = "friendsPrivacy = !friendsPrivacy"
                    ></b-input>    
                    <b-modal v-model = "friendsPrivacy" hide-footer=true>
                        <b>NOTE!</b>
                        Abuse and misuse of this function will result in the suspension from this platform.
                        <b-button class="mt-3" variant="outline-danger" block>Cancel</b-button>
                        <b-button class="mt-3" variant="outline-success" block @click="findFriends()">I understand</b-button>
                    </b-modal>

                    <!-- Sorting options -->
                    <b-form-select 
                    v-model="selected_sort" 
                    :options="sort" 
                    class = "mb-2 mr-sm-2 mb-sm-0"
                    id="b-form-input-module">
                    </b-form-select>
                </b-form>  
        </div>
   </div>

    <div class="row justify-content-center align-items-center h-100">
        <!-- Filter and sort options for Study Groups -->
        <div v-show="selected_type === 'Study'">
            <b-form inline>
            <!-- Find friends; First a warning would be issued and then allow search -->
            <b-input
                id="b-form-input-module"
                class = "mb-2 mr-sm-2 mb-sm-0 search"
                placeholder="Enter Username"
                v-model="studyfriends"
                v-on:keyup.enter = "friendsPrivacy = !friendsPrivacy"
            ></b-input>    
            <b-modal v-model = "friendsPrivacy" hide-footer=true>
                <b>NOTE!</b>
                Abuse and misuse of this function will result in the suspension from this platform.
                <b-button class="mt-3" variant="outline-danger" block>Cancel</b-button>
                <b-button class="mt-3" variant="outline-success" block @click="findFriends()">I understand</b-button>
            </b-modal>
            
            <b-form-select id="b-form-input-module" v-model="selected_faculty" :options="faculty" label-field= "faculty" class = "mb-2 mr-sm-2 mb-sm-0"></b-form-select>
            <b-form-select id="b-form-input-module" v-model="selected_location" :options="location" label-field= "location" class = "mb-2 mr-sm-2 mb-sm-0"></b-form-select>
            <b-form-select id="b-form-input-module" v-model="selected_sort" :options="sort" class = "mb-2 mr-sm-2 mb-sm-0"></b-form-select>
            
            </b-form>
        </div>
    </div>
    <br>
    <b-spinner variant = "primary" v-show = "finish_loading"></b-spinner>
    </b-container>
    
    <br>
    <!-- This is where the project groups will show up -->
    <div v-show="selected_type === 'Project'">
        <div v-show = "searchResultsProject || searchResultsStudy">
            <b-button v-on:click = "fetchProject()">Clear Search Results</b-button>
            <br>
            <h3 v-show = "noResultsFriendProj">No results for {{error_proj_friend}}</h3>
            <h3 v-show = "noResultsMod">No results for {{error_mod}}</h3>
        </div>
        <br>
        <b-row align-h="center">
                <ProjectGroup v-for = "(item) in projectList" v-bind:key = "item.id"  
                v-bind:module = "item.ModuleCode"
                v-bind:userId = "item.Poster"
                v-bind:post_desc = "item.Description"
                v-bind:post_status = "item.Limit > item.UserNames.length ? item.Limit- item.UserNames.length + ' more needed' : 'Closed'"
                v-bind:post_date = "item.DatePosted.toDate()"
                v-bind:members = "item.UserNames"
                :doc_id = "item.id"
                :hide_post = "item.hidden"
                ></ProjectGroup>
        </b-row>
     </div>

    <!-- This is where the study groups will show up -->
    <br>
    <div v-show="selected_type === 'Study'">
        <div v-show = "searchResultsStudy || searchResultsProject">       
            <b-button v-on:click = "fetchStudy()">Clear Search Results</b-button>
            <br>
            <h3 v-show = "noResultsFriendStudy">No results for {{error_study_friend}}</h3>
        </div>
        <b-row align-h="center" >
            <StudyGroup v-for = "(item) in studyList" 
            :key = "item.id"
            :groupName = "item.GroupName"
            :userId = "item.Poster" 
            :post_desc = "item.Description"
            :mod_code = "item.ModuleCode"
            :post_status= "item.UserNames.length < item.Limit ? item.Limit- item.UserNames.length + ' Needed' : 'Closed'"
            :post_date = "item.DatePosted.toDate()"
            :location = "item.Location"
            :members = "item.UserNames"
            :doc_id = "item.id"
            :hide_post = "item.hidden">
            </StudyGroup>    
      </b-row>
    </div>
  </b-container>    
  </div>
</template>

<script>
import ProjectGroup from './ProjectGroup.vue'
import StudyGroup from './StudyGroup.vue'
import NavBar from './NavBar.vue'
import database from '../firebase.js'

export default {
    components: {
        ProjectGroup,
        StudyGroup,
        'nb':NavBar
    }, methods: {
        fetchStudy: function() {
            this.studyList.length = 0;
            this.studyidList.length = 0;
            if (this.searchResultsStudy) {
                this.searchResultsStudy = false;
            }
            let studyGrp = {}
            database.collection('Study Group').get().then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    studyGrp = doc.data()
                    studyGrp.id = doc.id
                    this.studyList.push(studyGrp)
                })
            }).finally(() => {
                this.finish_loading = false;
            })
        },
        fetchProject: function() {
            this.projectList.length = 0;
            this.projectidList.length = 0;
            if (this.searchResultsProject) {
                this.searchResultsProject = false;
            }
            if (this.noResultsMod) {
                this.noResultsMod = false
            }
            let projectGrp = {}
            database.collection('Project Group').get().then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    projectGrp = doc.data()
                    projectGrp.id = doc.id
                    this.projectList.push(projectGrp)
                })
            }).finally(() => {
                this.finish_loading = false;
            })
        },
        searchModule: function() {
            this.projfriends = '';
            this.projectList.length = 0; // clear the existing project list
            let projectGrp = {};
            this.finish_loading = true;
            database.collection("Project Group").where("ModuleCode", "==", this.mod.toUpperCase()).get().then(
                (querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        projectGrp = doc.data()
                        projectGrp.id = doc.id
                        this.projectList.push(projectGrp)
                })
            }).finally(() => {
                this.searchResultsProject = true;
                // if there is no matching results
                if (this.projectList.length == 0) {
                    this.error_mod = this.mod;
                    this.noResultsMod = true;
                }
                this.finish_loading = false;
            })
           },
        findFriends: function() {
            this.mod = ''
            this.error_proj_friend = ''
            this.error_study_friend = ''
            this.noResultsFriendProj = false
            this.noResultsFriendStudy= false
            this.friendsPrivacy = !this.friendsPrivacy;
            this.projectList.length = 0; // clear the existing project list
            this.projectidList.length = 0;
            this.studyList.length = 0;
            this.studyidList.length = 0;
            console.log(this.studyList.length)
            let friends = (this.selected_type == "Project") ? this.projfriends : this.studyfriends
            this.finish_loading = true;
            database.collection('Users').where("UserName", "==", friends.toLowerCase()).get().then(
                (querySnapshot) => {
                    querySnapshot.forEach((userdoc) => { //userdoc is the FRIEND
                        this.projectidList = userdoc.data().ProjectGroupsCreated.concat(userdoc.data().ProjectGroupsJoined.id)
                        this.projectidList.forEach((grpid) => {
                            database.collection('Project Group').doc(grpid).get().then((grpdoc) => {
                                this.projectList.push(grpdoc.data())
                            })
                        })
                        this.studyidList = userdoc.data().StudyGroupsCreated.concat(userdoc.data().StudyGroupsJoined.id)
                        this.studyidList.forEach((grpid) => {
                            database.collection('Study Group').doc(grpid).get().then((grpdoc) => {
                                this.studyList.push(grpdoc.data())
                            })
                        })
                })
            }).finally(() => {
                if (this.selected_type == "Project") {
                    this.searchResultsProject = true;
                    // if there is no matching results
                    if (this.projectidList.length == 0) {
                        this.error_proj_friend = this.projfriends;
                        this.noResultsFriendProj = true;
                    }
                } else if (this.selected_type == "Study") {
                    this.searchResultsStudy = true;
                     if (this.studyidList.length == 0) {
                        this.error_study_friend = this.studyfriends;
                        this.noResultsFriendStudy = true;
                    }
                }
                this.finish_loading = false;
            })
        }   
    }
    ,data() {
        return {
            studyList: [],
            projectList: [],
            studyidList: [],
            projectidList: [],
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
            error_proj_friend: "",
            error_study_friend: "",
            selected_faculty: 'Any Faculty',
            faculty:[
                {value:'Any Faculty', text: 'Any Faculty'},
                {value:'School of Computing', text: 'School of Computing'},
                {value:'Faculty of Arts and Social Sciences', text: 'Faculty of Arts and Social Sciences'},
                {value:'Faculty of Science', text: 'Faculty of Science'},
                {value:'School of Design and Environment', text: 'School of Design and Environment'},
                {value:"School of Business", text: "School of Business"}, 
                {value:"Faculty of Engineering", text: "Faculty of Engineering"}       
            ],
            selected_location: 'Any Location',
            location:[
                {value:'Any Location', text: 'Any Location'},
                {value:'NUS', text:'NUS'},
                {value:'North', text:'North'},
                {value:'South', text:'South'},
                {value:'East', text:'East'},
                {value:'West', text:'West'}
            ],
            projfriends: "",
            studyfriends: "",
            noResultsMod: false,
            noResultsFriendProj: false,
            noResultsFriendStudy: false,
            searchResultsProject: false,
            searchResultsStudy: false,
            finish_loading: true,
            friendsPrivacy: false
        }
    },
    created() {
        this.fetchStudy();
        this.fetchProject();
    },
    watch: {
        selected_sort: function(change_sort) {
            if (this.selected_type == "Project") {
                this.projectList.length = 0; // clear the exisitng project list
                let projectGrp = {}
                if (change_sort === "Old") {
                    this.finish_loading = true;
                    database.collection('Project Group').orderBy('DatePosted').get().then((querySnapshot) => {
                        querySnapshot.forEach(doc => {
                            projectGrp = doc.data()
                            projectGrp.id = doc.id
                            this.projectList.push(projectGrp)
                        })
                    }).finally(() => {
                        this.finish_loading = false;
                    })
                } else if (change_sort === "New") {
                    this.finish_loading = true;
                    database.collection('Project Group').orderBy('DatePosted', "desc").get().then((querySnapshot) => {
                        querySnapshot.forEach(doc => {
                            projectGrp = doc.data()
                            projectGrp.id = doc.id
                            this.projectList.push(projectGrp)
                        })
                    }).finally(() => {
                        this.finish_loading = false;
                    })
                }
            } else if (this.selected_type == "Study") {
                this.studyList.length = 0;
                let studyGrp = {};
                if (change_sort === "Old") {
                    this.finish_loading = true;
                    database.collection('Study Group').orderBy('DatePosted').get().then((querySnapshot) => {
                        querySnapshot.forEach(doc => {
                            studyGrp = doc.data();
                            studyGrp.id = doc.id;
                            this.studyList.push(studyGrp);
                        })
                    }).finally(() => {
                        this.finish_loading = false;
                    })
                } else if (change_sort === "New") {
                    this.finish_loading = true;
                    database.collection('Study Group').orderBy('DatePosted', "desc").get().then((querySnapshot) => {
                        querySnapshot.forEach(doc => {
                            studyGrp = doc.data();
                            studyGrp.id = doc.id;
                            this.studyList.push(studyGrp);
                        })
                    }).finally(() => {
                        this.finish_loading = false;
                    })
                }
            }
        },
        selected_faculty: function(change_faculty) {
            this.studyList.length = 0;
            let studyGrp = {};
            this.finish_loading = true;

            if (change_faculty == 'Any Faculty') {
                this.fetchStudy();
            } else {
            // otherwise filter based on options
                database.collection("Study Group").where("Faculty", "==", change_faculty).get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        studyGrp = doc.data()
                        studyGrp.id = doc.id
                        this.studyList.push(studyGrp)
                    })
                }).finally(() => {
                    this.finish_loading = false;
                })
            }
        },
        selected_location: function(change_location) {
            this.studyList.length = 0;
            let studyGrp = {};
            this.finish_loading = true;

            if (change_location == 'Any Location') {
                this.fetchStudy();
            } else {
            // otherwise filter based on options
                database.collection("Study Group").where("Location", "==", change_location).get().then((querySnapshot) => {
                    querySnapshot.forEach(doc => {
                        studyGrp = doc.data()
                        studyGrp.id = doc.id
                        this.studyList.push(studyGrp)
                    })
                }).finally(() => {
                    this.finish_loading = false;
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
  background-color: #007bff;
  color: white;
  font-weight: 600;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

#b-form-input-module{
    padding-top: 2px;
    padding-bottom: 2px;
    width: 200px
}
</style>