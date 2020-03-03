<template>
<div> <nb></nb>
<h4> LoNUS Postings </h4>
<b-container fluid = "lg">
    
      <b-container fluid = "md" id="filterbox">
            <!--<b-form inline align-h="center">
    <div id = 'search-cust' align-h="center">
        <b-form-input v-on:keyup.enter = "submit" class = "search" placeholder="Search for module"></b-form-input>-->
        
   <!-- </b-form>-->
   <div class= "radio">
     <!--<b-form-group label="What kind of group are you looking for?" label-size="lg">-->
        <h3 id="whatgroup">What kind of group are you looking for?</h3>
      <b-form-radio-group
        id="radio-group-1"
        v-model="selected_type"
        :options="group_types"
        name="radio-options"
      ></b-form-radio-group> 
      </div> 
    
    
<div v-show="selected_type === 'Project'">
  <div class="row justify-content-center align-items-center h-100">

        <b-form inline>
        <!--<b-form-input v-on:keyup.enter = "submit" class = "mb-2 mr-sm-2 mb-sm-0 search" placeholder="Search for module"></b-form-input>-->
        <!--<label for="b-form-input-module" class = "">Enter Module Code: </label>-->
        <b-input
            id="b-form-input-module"
            class = "mb-2 mr-sm-2 mb-sm-0 search"
            placeholder="Enter module code"
            v-model="mod"
        ></b-input>
        
       <b-form-select 
       v-model="selected_sort" 
       :options="sort" 
       class = "mb-2 mr-sm-2 mb-sm-0">
       </b-form-select>
    
    </b-form>


      
      </div></div>

  <div class="row justify-content-center align-items-center h-100">
    <div v-show="selected_type === 'Study'">
        <b-form inline>
        <b-form-select v-model="selected_faculty" :options="faculties" label-field= "Faculty" class = "mb-2 mr-sm-2 mb-sm-0"></b-form-select>
        
        <b-form-select v-model="selected_area" :options="areas" label-field= "location" class = "mb-2 mr-sm-2 mb-sm-0"></b-form-select>
        <b-form-select v-model="selected_sort" :options="sort" class = "mb-2 mr-sm-2 mb-sm-0"></b-form-select>
        
        
       
        </b-form>
    </div></div></b-container>
 <div v-show="selected_type === 'Project'">
    <br>
    <b-row align-h="center" >
     <!--   <Post v-for = "m in posts" 
        :key = m.id
        :module = m.mod_code
        :userId = m.author_id
        :post_desc = m.post_desc
        :post_status= m.post_status
        :post_date = m.post_date>
        </Post>-->

        <Post v-for = "m in sortedFiltered"
        class = "post-feed" 
        :key = m.id
        :module = m.mod_code
        :userId = m.userId
        :post_desc = m.post_desc
        :post_status= m.post_status
        :post_date = m.post_date
        :members = m.members
        >
        </Post>
      </b-row>
        </div>


      <div v-show="selected_type === 'Study'">
    <br>
      <b-row align-h="center" >
        <StudyPost v-for = "s in filteredListStudy2" 
        :key = s.id
        :groupName = s.groupName
        :userId = s.userId
        :post_desc = s.post_desc
        :post_status= s.post_status
        :post_date = s.post_date
        :location = s.location
        :faculty = s.faculty
        :members = s.members>
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
export default {
    components: {
        Post,
        StudyPost,
        'nb':NavBar
    }, data() {
        return {
            mod:"",
            selected_type: 'Project',
            modules: ["BT3102", "CS1010S", "IS2101", "FAS1101","CS1111", "BT4014"],
            posts: [
                {
                    mod_code: "BT3103",
                    userId: "notspiderman",
                    post_desc: "Looking for one more member! Willing to accept anyone :)",
                    post_status: "4 out of 5 members",
                    post_date: new Date(2020, 1, 3),
                    members: ["notspiderman", "ned", "dodobird", "michaelangelo"]
                },
                {
                    mod_code: "BT3103",
                    userId: "berniesanders2020",
                    post_desc: "Freshmen duo looking to combine groups with anyone",
                    post_status: "2 out of 5 members",
                    post_date: new Date(2020, 1, 22),
                    members: ["berniesanders2020", "burntcheese"]
                },
                {
                    mod_code: "CS2222",
                    userId: "bezos",
                    post_desc: "Need two more members to do the project with. No freeloaders pls.",
                    post_status: "3 out of 5 members",
                    post_date: new Date(2020, 1, 11),
                    members: ["bezos", "bloomburger", "donaldo_trumpo"]
                },
        
                {
                    mod_code: "IS1111",
                    userId: "xx_jeremiah_xx",
                    post_desc: "We are looking for 1 more group member!!",
                    post_status: "4 out of 5 members",
                    post_date: new Date(2020, 1, 8) ,
                    members: ["xx_jeremiah_xx", "orangecounty", "jiajia", "kaikai"]
                },
                {
                    mod_code: "GET1000",
                    userId: "jin",
                    post_desc: "Group of y2s from computing, need one more member for the project.",
                    post_status: "4 out of 5 members",
                    post_date: new Date(2020, 1, 18),
                    members: ["jin","dodobird","tonydanza", "notspiderman"]
                
                }
            ],
            studyposts:[
                {
                    groupName: "West Side, Best Side!",
                    userId: "minniemouse",
                    post_desc: "meets at Jurong Library level 4 every Monday",
                    post_status: "5 out of (no limit) members",
                    post_date: new Date(2020, 1, 22),
                    location: "West",
                    faculty: "Computing",
                    members: ["minniemouse", "thanos", "momsayshi", "sakura", "dominicmlm"]
                },{
                    groupName: "otw to cap 5.0",
                    userId: "deanslistwannabe",
                    post_desc: "Studying all day, every day, at utown town plaza",
                    post_status: "4 out of 6 members",
                    post_date: new Date(2020, 1, 14),
                    location: "NUS",
                    faculty: "Any",
                    members: ["deanslistwannabe", "mathgeek", "hitachi", "toyota"]
                },
                {
                    groupName: "FASS freshies",
                    userId: "gl",
                    post_desc: "at the area outside coffee hut every wed and fri",
                    post_status: "3 out of 10 members",
                    post_date: new Date(2020, 1, 12),
                    location: "NUS",
                    faculty: "FASS",
                    members: ["gl", "elmo", "kforkale"]
                },
                {
                    groupName: "CLB muggers",
                    userId: "notspiderman",
                    post_desc: "Monday - Friday, 10am - 8pm at CLB! Join if you're looking to mug all day!",
                    post_status: "3 out of 6 members",
                    post_date: new Date(2020, 1, 2),
                    location: "NUS",
                    faculty: "Computing",
                    members: ["notspiderman", "ned", "tomandjerry"]
                },
                {
                    groupName: "we <3 coffee",
                    userId: "starbuckslover",
                    post_desc: "we study at jewel/T2 starbucks every weekend!",
                    post_status: "2 out of 5 members",
                    post_date: new Date(2020, 1, 28),
                    location: "East",
                    faculty: "Any",
                    members: ["starbuckslover", "americano"]
                }
            ],
            selected_faculty:"",
            selected_department:null,
            selected_sort:'New',
            selected_area:"",
            group_types: [ 
                {text: 'Project', value: 'Project'},
                {text: 'Study', value: 'Study'}
            ],
            faculties: [
                {value:"", text: 'Select a Faculty'},
                {value:"", text: 'Any Faculty'},
                {value:'Computing', text: 'Computing'},
                {value:'FASS', text: 'FASS'}
            ],
            departments: [
                {value:null, text: 'Select a Department'},
                {value:'Computer Science', text: 'Computer Science'}
            ], sort:[
                {value:'New', text: 'Sort By'},
                {value:'New', text:'Date Posted, Newest First'},
                {value:'Old', text:'Date Posted, Oldest First'}    
            ], areas:[
                {value:"", text: 'Select a Location'},
                {value:'East', text: 'East'},
                {value:'West', text: 'West'},
                {value:'NUS', text: 'NUS'}
            ]
            }
    },
    computed: {
        filteredList() {
        return this.posts.filter(grp => {
            return grp.mod_code.toLowerCase().includes(this.mod.toLowerCase())
        })
        },

        filteredListStudy() {
        return (this.studyposts.filter(study => {
            return study.location.toLowerCase().includes(this.selected_area.toLowerCase()) 
        }))
        },
        filteredListStudy2() {
            return this.selected_sort === "Old" ? this.filteredListStudy.filter(s => {return s.faculty.toLowerCase().includes(this.selected_faculty.toLowerCase())})
            .slice().sort((a, b) => a.post_date - b.post_date) :
            this.selected_sort === "New" ? this.filteredListStudy.filter(s => {
                return s.faculty.toLowerCase().includes(this.selected_faculty.toLowerCase())
            }).slice().sort((a, b) => b.post_date - a.post_date) : ""
        },
        sortedListNew() {
            return this.selected_sort === "Old" ? this.posts.slice().sort((a, b) => a.post_date - b.post_date) :
                   this.selected_sort === "New" ? this.posts.slice().sort((a, b) => b.post_date - a.post_date) : "";
        },
        sortedFiltered() {
            return this.sortedListNew.filter(grp => {
            return grp.mod_code.toLowerCase().includes(this.mod.toLowerCase())
        })
        }
    }

}
</script>

<style scoped>
 
/*.search{
    width: 50%;
}*/


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