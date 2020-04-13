<template>
<div>
<nb></nb>
<b-container class="big">
    <br>
    <div class="info">
    <b-row class="justify-content-md-center" >
        
           <b-col class = "icon" col lg="3">
               
                <b-img left src='https://66.media.tumblr.com/19b4fd02190fe6d034f763442456191f/tumblr_owelzq4E7j1tf5kqco9_250.png' rounded="circle" width=150px></b-img>
            </b-col>
            <b-col id ='about'>
               
                <b-row id = "Name">
                {{spidey.name}} </b-row> 
                <b-row id = "username">@{{spidey.username}}</b-row>
                <b-row id = 'details' cols=6>
               Year {{spidey.year}} {{spidey.major}} student
            </b-row><br><br>
  
                </b-col>
            
            </b-row>
            
            </div>
    
        <b-row>
            <b-col>
            <b-card no-body >
                <b-tabs pills card>
                    <b-tab title="Groups Created" active>
                        <b-row align-h="left" >
                            <ProjectGroup v-for = "m in posts"
                                class = "post-feed" 
                                :key = m.id
                                :module = m.mod_code
                                :userId = m.userId
                                :post_desc = m.post_desc
                                :post_status= m.post_status
                                :post_date = m.post_date
                                :members = m.members
                                >
                                </ProjectGroup>
                                <StudyGroup v-for = "s in studygroups" 
                                :key = s.id
                                :groupName = s.groupName
                                :userId = s.userId
                                :post_desc = s.post_desc
                                :post_status= s.post_status
                                :post_date = s.post_date
                                :location = s.location
                                :faculty = s.faculty
                                :members = s.members
                                >
                                </StudyGroup>  
                        </b-row>
                    </b-tab>
                    <b-tab title = 'Groups Joined'><b-row align-h="left" >
                            <ProjectGroup v-for = "m in joined"
                                class = "post-feed" 
                                :key = m.id
                                :module = m.mod_code
                                :userId = m.userId
                                :post_desc = m.post_desc
                                :post_status= m.post_status
                                :post_date = m.post_date
                                :members = m.members
                                >
                                </ProjectGroup></b-row></b-tab>
                    </b-tabs>
            </b-card></b-col>
           

        
    </b-row> 
    
    
</b-container>
</div>
</template>

<script>
import NavBar from './NavBar.vue'
import ProjectGroup from './ProjectGroup.vue'
import StudyGroup from './StudyGroup.vue'
export default {
    components: {
        'nb' : NavBar,
        ProjectGroup,
        StudyGroup
    },
    props: ["icon", "name", "userId", "img", "major", "username"],
    data() {
        return {
            spidey: {
                icon: 'https://66.media.tumblr.com/19b4fd02190fe6d034f763442456191f/tumblr_owelzq4E7j1tf5kqco9_250.png',
                name: 'Peter P.',
                userId: 1,
                major: 'Business Analytics',
                username: "notspiderman",
                year: 2

            }, 
            projectgroups: [
                {
                    mod_code: "BT3103",
                    userId: "notspiderman",
                    post_desc: "Looking for one more member! Willing to accept anyone :)",
                    post_status: "4 out of 5 members",
                    post_date: new Date(2020, 1, 3),
                    members: ["notspiderman", "ned","dodobird", "michaelangelo"]
                }
            ],
            studygroups: [
                {
                    groupName: "CLB muggers",
                    userId: "notspiderman",
                    post_desc: "Monday - Friday, 10am - 8pm at CLB! Join if you're looking to mug all day!",
                    post_status: "3 out of 6 members",
                    post_date: new Date(2020, 1, 2),
                    location: "NUS",
                    faculty: "Any",
                    members: ["notspiderman", "ned", "tomandjerry"]
                }
            ],
            joined:[
                {
                    mod_code: "GET1000",
                    userId: "jin",
                    post_desc: "Group of y2s from computing, need one more member for the project.",
                    post_status: "4 out of 5 members",
                    post_date: new Date(2020, 1, 18),
                    members: ["jin","dodobird","tonydanza", "notspiderman"]
                
                }
            ]
        }
    }
}
</script>

<style>
.profile-sidebar {
    background-color: paleturquoise
}

.profile-activity {
    background-color: palegoldenrod
}

#Name {
    font-size: 32px;
    text-align: center;
    letter-spacing: 1px;
    font-weight: bold;
}

#username {
    color:gray;
}
#details {
    margin-top: 5px;
    
}
#about {
    margin-left: -30px;
}

.icon {
    margin-bottom: 20px;
}


</style>